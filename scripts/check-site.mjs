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
const workProjectSlugs = [
  'aks-migration',
  'datatableview',
  'ci-cd-performance',
  'reporting-copilot-chat-integration',
  'deal-monitoring-ui',
  'v1-to-v2-deal-migration-api',
  'unified-reporting-ui'
];
const personalProjectSlugs = ['game-of-life', 'wintermuted-ui-theme', 'jsonresume-theme-wintermuted'];
const resumeProjectIds = {
  'aks-migration': 'aks-migration-platform',
  datatableview: 'datatableview-component-library',
  'ci-cd-performance': 'ci-cd-pipeline-performance',
  'reporting-copilot-chat-integration': 'reporting-copilot-chat-integration',
  'deal-monitoring-ui': 'deal-monitoring-ui',
  'v1-to-v2-deal-migration-api': 'v1-to-v2-deal-migration-api',
  'unified-reporting-ui': 'unified-reporting-ui'
};
const workProjectTitles = {
  'aks-migration': 'Copilot-assisted AKS migration',
  datatableview: 'DataTableView',
  'ci-cd-performance': 'CI/CD pipeline performance',
  'reporting-copilot-chat-integration': 'Reporting Copilot Chat Integration',
  'deal-monitoring-ui': 'Deal Monitoring UI',
  'v1-to-v2-deal-migration-api': 'V1 to V2 Deal Migration API',
  'unified-reporting-ui': 'Unified Reporting UI'
};
const workProjectPreviews = {
  'aks-migration': [
    { type: 'diagram', alt: 'High-level AKS migration workflow', content: 'Copilot-assisted workflow' }
  ],
  datatableview: [
    { type: 'image', src: '/assets/img/portfolio/datatableview-redacted-table.png', alt: 'Redacted DataTableView table' },
    { type: 'image', src: '/assets/img/portfolio/datatableview-redacted-filters.png', alt: 'Redacted DataTableView filter panel' }
  ],
  'ci-cd-performance': [
    { type: 'diagram', alt: 'Selective CI/CD flow', content: 'Dependency-aware selection' }
  ],
  'deal-monitoring-ui': [
    { type: 'diagram', alt: 'High-level monitoring table flow', content: 'Virtualized row rendering' }
  ],
  'unified-reporting-ui': [
    { type: 'diagram', alt: 'High-level reporting flow', content: 'Explore visual results' }
  ],
  'reporting-copilot-chat-integration': [
    { type: 'diagram', alt: 'Prototype flow', content: 'Structured report query' }
  ],
  'v1-to-v2-deal-migration-api': [
    { type: 'diagram', alt: 'High-level migration flow', content: 'Restore prior state' }
  ]
};
const projectIndex = read('projects/index.html');
const portfolioVisuals = {
  'aks-migration': ['aks-migration-workflow'],
  datatableview: ['datatableview-redacted-table.png', 'datatableview-redacted-filters.png', 'datatableview-architecture'],
  'ci-cd-performance': ['ci-cd-selective-builds'],
  'deal-monitoring-ui': ['deal-monitoring-architecture'],
  'unified-reporting-ui': ['unified-reporting-architecture'],
  'reporting-copilot-chat-integration': ['reporting-copilot-prototype-flow'],
  'v1-to-v2-deal-migration-api': ['deal-migration-flow']
};
const privateSourceScreenshots = [
  'personal-cv-experience.png', 'personal-cv-projects.png', 'personal-cv-skills.png', 'personal-cv-summary.png',
  'copilot-chat-prompt.png', 'copilot-chat-response.png', 'deal-monitoring-detail.jpg',
  'deal-monitoring-filters.png', 'deal-monitoring-table-view.png', 'pipeline-dag.png', 'pipeline-metrics.jpg',
  'reporting-dashboard.png', 'reporting-drilldown.jpg'
];
const professionalSection = projectIndex.match(
  /<section\b[^>]*aria-labelledby="professional-projects-heading"[^>]*>([\s\S]*?)<\/section>/
)?.[1];
if (!professionalSection) throw new Error('Missing professional work portfolio section');
const professionalCards = Array.from(
  professionalSection.matchAll(/<article class="project-card-item"[^>]*>([\s\S]*?)<\/article>/g),
  match => match[1]
);
if (professionalCards.length !== workProjectSlugs.length) {
  throw new Error(`Expected ${workProjectSlugs.length} professional work cards, found ${professionalCards.length}`);
}
for (const slug of workProjectSlugs) {
  if (!existsSync(join(site, 'projects', slug, 'index.html'))) throw new Error(`Missing work project: ${slug}`);
  const project = read(`projects/${slug}/index.html`);
  requireText(project, `<span>${workProjectTitles[slug]}</span>`, `${slug} page title`);
  requireText(projectIndex, `href="/projects/${slug}/"`, 'projects index');
  const card = professionalCards.find(candidate => candidate.includes(`href="/projects/${slug}/"`) &&
      candidate.includes('class="project-card-title"'));
  if (!card) {
    throw new Error(`Missing professional portfolio card: ${slug}`);
  }
  if (!card.includes('class="card project-card"')) {
    throw new Error(`Missing professional card container: ${slug}`);
  }
  for (const preview of workProjectPreviews[slug]) {
    if (preview.type === 'diagram') {
      const figure = card.match(/<div class="project-card-media project-card-media--diagram">[\s\S]*?<figure\b[^>]*class="project-diagram project-diagram--compact project-card-diagram"[^>]*>[\s\S]*?<\/figure>[\s\S]*?<\/div>/)?.[0];
      if (!figure || !figure.includes(`aria-label="${preview.alt}"`) ||
          !figure.includes('class="mermaid" aria-hidden="true"') || !figure.includes(preview.content)) {
        throw new Error(`Missing accessible Mermaid preview for ${slug}`);
      }
    } else {
      if (!card.includes('class="project-card-media project-card-media--preview project-card-media--preview-paired"')) {
        throw new Error(`Redacted DataTableView previews are not paired: ${slug}`);
      }
      const imageTags = Array.from(card.matchAll(/<img\b[^>]*>/g), match => match[0]);
      const image = imageTags.find(tag => tag.includes(`src="${preview.src}"`));
      if (!image || !image.match(/\balt="([^"]+)"/)?.[1]?.includes(preview.alt)) {
        throw new Error(`Missing accessible preview image for ${slug}: ${preview.src}`);
      }
      if (!image.includes('loading="lazy"') || !image.includes('decoding="async"') ||
          !image.includes('width="640"') || !image.includes('height="360"')) {
        throw new Error(`Preview image is missing responsive loading dimensions for ${slug}: ${preview.src}`);
      }
      if (!existsSync(join(site, preview.src.replace(/^\//, '')))) {
        throw new Error(`Missing professional card preview asset for ${slug}: ${preview.src}`);
      }
    }
  }
  const legacyLink = `<li id="project-${resumeProjectIds[slug]}"><a href="/projects/${slug}/">`;
  requireText(resume, legacyLink, 'resume project links');
}
for (const slug of personalProjectSlugs) {
  if (!existsSync(join(site, 'projects', slug, 'index.html'))) throw new Error(`Missing personal project: ${slug}`);
  requireText(projectIndex, `href="/projects/${slug}/"`, 'projects index');
}
if (/case study not yet available/i.test(resume)) {
  throw new Error('Resume still contains an unavailable case-study placeholder');
}
for (const [slug, visuals] of Object.entries(portfolioVisuals)) {
  const project = read(`projects/${slug}/index.html`);
  for (const visual of visuals) requireText(project, visual, `${slug} visual`);
}
const copilotPrototype = read('projects/reporting-copilot-chat-integration/index.html');
requireText(copilotPrototype, '<strong>Status:</strong> Prototype', 'Reporting Copilot project status');
requireText(copilotPrototype, 'not presented as a completed production feature', 'Reporting Copilot prototype scope');
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
for (const slug of [...workProjectSlugs, 'game-of-life']) {
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
  if (workProjectSlugs.includes(slug)) {
    const sidebar = project.match(/<aside id="project-detail-sidebar"[^>]*>([\s\S]*?)<\/aside>/)?.[1] ?? '';
    for (const marker of ['<strong>Role:</strong>', '<strong>Status:</strong>', '<strong>Timeline:</strong>']) {
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
