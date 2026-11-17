import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const site = '_site';
const read = path => readFileSync(join(site, path), 'utf8');
const requireText = (text, needle, label) => {
  if (!text.includes(needle)) throw new Error(`${label}: missing ${needle}`);
};
const resume = read('resume');
const projectSlugs = ['aks-migration', 'datatableview', 'ci-cd-performance'];
for (const slug of projectSlugs) {
  if (!existsSync(join(site, 'projects', slug, 'index.html'))) throw new Error(`Missing project: ${slug}`);
  requireText(resume, `/projects/${slug}/`, 'resume');
  requireText(read('projects/index.html'), `/projects/${slug}/`, 'projects index');
}
for (const anchor of ['aks-migration-platform', 'reporting-copilot-chat-integration', 'datatableview-component-library',
  'deal-monitoring-ui', 'v1-to-v2-deal-migration-api', 'unified-reporting-ui', 'ci-cd-pipeline-performance',
  'game-of-life', 'wintermuted-ui-theme', 'personal-cv-jsonresume-theme-wintermuted']) {
  requireText(resume, `id="project-${anchor}"`, 'legacy anchors');
}
if (existsSync('resume-bundle')) {
  const pdf = readFileSync(join(site, 'resume.pdf'));
  if (!pdf.equals(readFileSync('resume-bundle/resume.pdf'))) throw new Error('Published PDF does not match the reviewed bundle');
  requireText(resume, 'class="compact-resume"', 'resume');
  requireText(resume, '/resume.pdf', 'resume');
  requireText(read('about/index.html'), '/resume.pdf', 'about');
} else {
  if (existsSync(join(site, 'resume.pdf'))) throw new Error('Pending bundle must not publish a PDF');
  requireText(resume, 'awaiting a reviewed publication bundle', 'pending resume');
}
console.log('Site resume and portfolio routes verified.');
