import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { importBundle, validateBundle } from '../scripts/import-resume.mjs';

const digest = value => createHash('sha256').update(value).digest('hex');
const pins = { sourceRevision: 'a'.repeat(40), profileSha256: 'b'.repeat(64) };

function fixture(dir) {
  mkdirSync(dir);
  const fragment = '<article class="compact-resume"><h1>Example</h1></article>';
  const files = {
    'resume.public.json': JSON.stringify({ schemaVersion: 1, profile: 'general', basics: {}, work: [], education: [], skills: [], projects: [] }),
    'resume.fragment.html': fragment,
    'resume.html': `<!doctype html><html><body>${fragment}</body></html>`,
    'resume.pdf': '%PDF-1.7\nfixture'
  };
  for (const [name, content] of Object.entries(files)) writeFileSync(join(dir, name), content);
  writeFileSync(join(dir, 'manifest.json'), JSON.stringify({
    schemaVersion: 1, profile: 'general', ...pins,
    files: Object.fromEntries(Object.entries(files).map(([name, content]) => [name, digest(content)]))
  }));
}

test('imports a matched reviewed bundle', () => {
  const temp = mkdtempSync(join(tmpdir(), 'resume-test-'));
  try {
    const source = join(temp, 'source');
    const destination = join(temp, 'destination');
    fixture(source);
    importBundle(source, destination, pins);
    assert.equal(validateBundle(destination).sourceRevision, pins.sourceRevision);
    assert.deepEqual(readFileSync(join(destination, 'resume.pdf')), readFileSync(join(source, 'resume.pdf')));
  } finally { rmSync(temp, { recursive: true }); }
});

test('rejects mismatched pins, checksums and unexpected files without replacing the approved bundle', () => {
  const temp = mkdtempSync(join(tmpdir(), 'resume-test-'));
  try {
    const source = join(temp, 'source');
    const destination = join(temp, 'destination');
    fixture(source);
    importBundle(source, destination, pins);
    const original = readFileSync(join(destination, 'manifest.json'));
    assert.throws(() => importBundle(source, destination, { ...pins, sourceRevision: 'c'.repeat(40) }), /reviewed pin/);
    writeFileSync(join(source, 'resume.pdf'), '%PDF-tampered');
    assert.throws(() => importBundle(source, destination, pins), /Checksum mismatch/);
    writeFileSync(join(source, 'private.txt'), 'not public');
    assert.throws(() => importBundle(source, destination, pins), /allowlisted/);
    assert.deepEqual(readFileSync(join(destination, 'manifest.json')), original);
    validateBundle(destination, pins);
  } finally { rmSync(temp, { recursive: true }); }
});

test('rejects a mismatched browser fragment and active content even when checksums match', () => {
  const temp = mkdtempSync(join(tmpdir(), 'resume-test-'));
  try {
    const source = join(temp, 'source');
    fixture(source);
    const manifestPath = join(source, 'manifest.json');
    const manifest = JSON.parse(readFileSync(manifestPath));
    const fragment = '<article class="compact-resume"><script>alert(1)</script></article>';
    writeFileSync(join(source, 'resume.fragment.html'), fragment);
    manifest.files['resume.fragment.html'] = digest(fragment);
    writeFileSync(manifestPath, JSON.stringify(manifest));
    assert.throws(() => validateBundle(source), /does not contain/);
    const html = `<html>${fragment}</html>`;
    writeFileSync(join(source, 'resume.html'), html);
    manifest.files['resume.html'] = digest(html);
    writeFileSync(manifestPath, JSON.stringify(manifest));
    assert.throws(() => validateBundle(source), /Unsafe active content/);
  } finally { rmSync(temp, { recursive: true }); }
});

test('rejects private projection fields even when their checksum matches', () => {
  const temp = mkdtempSync(join(tmpdir(), 'resume-test-'));
  try {
    const source = join(temp, 'source');
    fixture(source);
    const manifestPath = join(source, 'manifest.json');
    const manifest = JSON.parse(readFileSync(manifestPath));
    const projection = JSON.parse(readFileSync(join(source, 'resume.public.json')));
    projection.privateEvidence = 'not for publication';
    const text = JSON.stringify(projection);
    writeFileSync(join(source, 'resume.public.json'), text);
    manifest.files['resume.public.json'] = digest(text);
    writeFileSync(manifestPath, JSON.stringify(manifest));
    assert.throws(() => validateBundle(source), /non-public fields/);
  } finally { rmSync(temp, { recursive: true }); }
});
