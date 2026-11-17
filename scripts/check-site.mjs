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
const portfolioVisuals = {
  'aks-migration': ['aks-migration-workflow'],
  datatableview: ['datatableview-redacted-table.png', 'datatableview-redacted-filters.png', 'datatableview-architecture'],
  'ci-cd-performance': ['ci-cd-selective-builds']
};
const privateSourceScreenshots = [
  'personal-cv-experience.png', 'personal-cv-projects.png', 'personal-cv-skills.png', 'personal-cv-summary.png',
  'copilot-chat-prompt.png', 'copilot-chat-response.png', 'deal-monitoring-detail.jpg',
  'deal-monitoring-filters.png', 'deal-monitoring-table-view.png', 'pipeline-dag.png', 'pipeline-metrics.jpg',
  'reporting-dashboard.png', 'reporting-drilldown.jpg'
];
for (const slug of projectSlugs) {
  requireText(resume, `/projects/${slug}/`, 'resume');
  requireText(projectIndex, `/projects/${slug}/`, 'projects index');
}
for (const [slug, visuals] of Object.entries(portfolioVisuals)) {
  const project = read(`projects/${slug}/index.html`);
  for (const visual of visuals) requireText(project, visual, `${slug} visual`);
}
for (const [slug, markers] of Object.entries({
  datatableview: [
    'alt="Application table with the original customer and deal records removed."',
    'alt="Filter drawer with no customer records or active selections shown."',
    'all original record values and identifiers are redacted',
    'the original background table and active selection are removed'
  ],
  'aks-migration': ['internal systems and routing are omitted'],
  'ci-cd-performance': ['internal pipeline details and run metrics are omitted']
})) {
  const project = read(`projects/${slug}/index.html`);
  for (const marker of markers) requireText(project, marker, `${slug} visual description`);
}
for (const filename of privateSourceScreenshots) {
  if (existsSync(join(site, 'assets', 'screenshots', filename))) {
    throw new Error(`Sensitive source screenshot was included in the site: ${filename}`);
  }
}
if (!existsSync(join(site, 'assets', 'screenshots', 'game-of-life-select-dark.png'))) {
  throw new Error('Open-source project screenshots should remain available');
}
for (const filename of ['datatableview-redacted-table.png', 'datatableview-redacted-filters.png']) {
  if (!existsSync(join(site, 'assets', 'img', 'portfolio', filename))) {
    throw new Error(`Missing sanitized portfolio visual: ${filename}`);
  }
}
for (const slug of [...projectSlugs, 'game-of-life']) {
  const project = read(`projects/${slug}/index.html`);
  for (const marker of ['class="project-titlebar-main"', 'class="project-detail-shell"',
    'id="project-side-nav"', 'class="project-detail-main"', 'id="project-detail-sidebar"']) {
    requireText(project, marker, slug);
  }
  const tabs = Array.from(project.matchAll(/data-project-tab-target="([^"]+)"/g), match => match[1]);
  const expectedTabs = slug === 'game-of-life' ? 'details,architecture,roadmap,devlog' : 'details,architecture';
  if (tabs.join(',') !== expectedTabs) {
    throw new Error(`${slug}: expected project tabs ${expectedTabs}, found ${tabs.join(', ')}`);
  }
  if (slug !== 'game-of-life') {
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
