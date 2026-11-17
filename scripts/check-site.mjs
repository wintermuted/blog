import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const site = '_site';
const read = path => readFileSync(join(site, path), 'utf8');
const requireText = (text, needle, label) => {
  if (!text.includes(needle)) throw new Error(`${label}: missing ${needle}`);
};
const resumePath = ['resume.html', 'resume/index.html'].find(path => existsSync(join(site, path)));
if (!resumePath) throw new Error('Missing generated resume page');
const resume = read(resumePath);
const projectSlugs = ['aks-migration', 'datatableview', 'ci-cd-performance'];
const projectIndex = read('projects/index.html');
for (const slug of projectSlugs) {
  requireText(resume, `/projects/${slug}/`, 'resume');
  requireText(projectIndex, `/projects/${slug}/`, 'projects index');
}
for (const slug of [...projectSlugs, 'game-of-life']) {
  const project = read(`projects/${slug}/index.html`);
  for (const marker of ['class="project-titlebar-main"', 'class="project-detail-shell"',
    'id="project-side-nav"', 'class="project-detail-main"', 'id="project-detail-sidebar"']) {
    requireText(project, marker, slug);
  }
  const tabs = Array.from(project.matchAll(/data-project-tab-target="([^"]+)"/g), match => match[1]);
  if (slug === 'game-of-life') {
    if (tabs.join(',') !== 'details,architecture,roadmap,devlog') {
      throw new Error(`${slug}: unexpected project tabs: ${tabs.join(', ')}`);
    }
  } else {
    if (tabs.length) throw new Error(`${slug}: unexpected project tabs: ${tabs.join(', ')}`);
    const sidebar = project.match(/<aside id="project-detail-sidebar"[^>]*>([\s\S]*?)<\/aside>/)?.[1] ?? '';
    for (const marker of ['<strong>Role:</strong>', '<strong>Status:</strong>', '<strong>Timeline:</strong>',
      'href="/projects/"', 'href="/resume"']) {
      requireText(sidebar, marker, `${slug} sidebar`);
    }
    requireText(project, 'Validation and outcome</h2>', slug);
  }
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
console.log('Site resume, portfolio routes, and shared project layouts verified.');
