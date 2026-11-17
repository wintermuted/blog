import { createHash, randomUUID } from 'node:crypto';
import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = ['resume.public.json', 'resume.fragment.html', 'resume.html', 'resume.pdf'];
const bundleNames = ['manifest.json', ...files].sort();
const hash = data => createHash('sha256').update(data).digest('hex');
const fail = message => { throw new Error(message); };
const allowedKeys = (value, keys, label) => {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(key => !keys.includes(key))) {
    fail(`Invalid or non-public fields in ${label}`);
  }
};

export function validateBundle(dir, expected = {}) {
  const entries = readdirSync(dir).sort();
  if (JSON.stringify(entries) !== JSON.stringify(bundleNames)) fail('Bundle must contain exactly the five allowlisted files');
  for (const name of entries) {
    if (!lstatSync(join(dir, name)).isFile()) fail(`Bundle entry is not a regular file: ${name}`);
  }
  const manifest = JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf8'));
  allowedKeys(manifest, ['schemaVersion', 'profile', 'sourceRevision', 'profileSha256', 'files'], 'manifest');
  if (manifest.schemaVersion !== 1 || manifest.profile !== 'general' ||
      !/^[a-f0-9]{40}$/.test(manifest.sourceRevision) ||
      !/^[a-f0-9]{64}$/.test(manifest.profileSha256)) fail('Invalid manifest identity');
  if (expected.sourceRevision && manifest.sourceRevision !== expected.sourceRevision) fail('Source revision does not match the reviewed pin');
  if (expected.profileSha256 && manifest.profileSha256 !== expected.profileSha256) fail('Profile checksum does not match the reviewed pin');
  if (!manifest.files || JSON.stringify(Object.keys(manifest.files).sort()) !== JSON.stringify([...files].sort())) fail('Invalid manifest file allowlist');
  const content = {};
  for (const name of files) {
    content[name] = readFileSync(join(dir, name));
    if (!/^[a-f0-9]{64}$/.test(manifest.files[name]) || hash(content[name]) !== manifest.files[name]) fail(`Checksum mismatch: ${name}`);
  }
  const projection = JSON.parse(content['resume.public.json'].toString('utf8'));
  if (projection.schemaVersion !== 1 || projection.profile !== 'general' || !projection.basics ||
      !Array.isArray(projection.work) || !Array.isArray(projection.education) ||
      !Array.isArray(projection.skills) || !Array.isArray(projection.projects)) fail('Invalid public resume projection');
  allowedKeys(projection, ['schemaVersion', 'profile', 'basics', 'work', 'education', 'skills', 'projects'], 'projection');
  allowedKeys(projection.basics, ['name', 'label', 'email', 'phone', 'location', 'url', 'profiles', 'summary'], 'basics');
  if (projection.basics.profiles !== undefined) {
    if (!Array.isArray(projection.basics.profiles)) fail('Invalid public profiles');
    for (const profile of projection.basics.profiles) allowedKeys(profile, ['network', 'url'], 'profile');
  }
  for (const work of projection.work) {
    allowedKeys(work, ['id', 'name', 'position', 'startDate', 'endDate', 'summary', 'highlights'], 'work');
    if (!Array.isArray(work.highlights)) fail('Invalid work highlights');
    for (const highlight of work.highlights) allowedKeys(highlight, ['id', 'text', 'projectUrl'], 'highlight');
  }
  for (const item of projection.education) allowedKeys(item, ['institution', 'studyType', 'area', 'startDate', 'endDate'], 'education');
  for (const skill of projection.skills) allowedKeys(skill, ['name', 'keywords'], 'skill');
  for (const project of projection.projects) allowedKeys(project, ['id', 'name', 'url', 'summary'], 'project');
  const fragment = content['resume.fragment.html'].toString('utf8').trim();
  const html = content['resume.html'].toString('utf8');
  if (!/^<article\s+class="compact-resume"/.test(fragment) || !fragment.endsWith('</article>') || !html.includes(fragment)) fail('Browser HTML does not contain the compact resume fragment');
  if (/<\s*(script|iframe|object|embed|form|base)\b|\son[a-z]+\s*=|(?:href|src)\s*=\s*["']\s*javascript:|{%|{{/i.test(fragment) ||
      /<\s*(script|iframe|object|embed|form|base)\b|\son[a-z]+\s*=|(?:href|src)\s*=\s*["']\s*javascript:/i.test(html)) fail('Unsafe active content or template syntax in resume HTML');
  if (!content['resume.pdf'].subarray(0, 5).equals(Buffer.from('%PDF-'))) fail('Invalid PDF header');
  return manifest;
}

export function importBundle(source, destination, expected) {
  if (!/^[a-f0-9]{40}$/.test(expected.sourceRevision || '') || !/^[a-f0-9]{64}$/.test(expected.profileSha256 || '')) fail('Both reviewed pins are required');
  validateBundle(source, expected);
  const parent = dirname(destination);
  const stage = join(parent, `.resume-import-${randomUUID()}`);
  const backup = join(parent, `.resume-backup-${randomUUID()}`);
  mkdirSync(stage);
  let backedUp = false;
  try {
    for (const name of bundleNames) writeFileSync(join(stage, name), readFileSync(join(source, name)), { flag: 'wx' });
    validateBundle(stage, expected);
    if (existsSync(destination)) {
      renameSync(destination, backup);
      backedUp = true;
    }
    try {
      renameSync(stage, destination);
    } catch (error) {
      if (backedUp) renameSync(backup, destination);
      backedUp = false;
      throw error;
    }
    if (backedUp) rmSync(backup, { recursive: true });
  } finally {
    if (existsSync(stage)) rmSync(stage, { recursive: true });
  }
}

function main(args) {
  const destination = join(root, 'resume-bundle');
  if (args[0] === 'verify' && (args.length === 1 || (args.length === 2 && args[1] === '--allow-pending'))) {
    if (!existsSync(destination) && args[1] === '--allow-pending') {
      console.log('Resume bundle is pending; no PDF will be published.');
      return;
    }
    validateBundle(destination);
    console.log('Resume bundle verified.');
    return;
  }
  if (args.length !== 6 || args[0] !== 'import' || args[2] !== '--source-revision' || args[4] !== '--profile-sha256') {
    fail('Usage: node scripts/import-resume.mjs import <bundle-directory> --source-revision <40-hex> --profile-sha256 <64-hex> | verify [--allow-pending]');
  }
  importBundle(resolve(args[1]), destination, { sourceRevision: args[3], profileSha256: args[5] });
  console.log('Reviewed resume bundle imported. Review the resulting changes before publication.');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(`Resume bundle: ${error.message}`); process.exitCode = 1; }
}
