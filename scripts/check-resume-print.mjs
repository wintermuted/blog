import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join, resolve, sep } from 'node:path';

const hasBundle = existsSync('resume-bundle');
const root = resolve('_site');
const resume = ['resume.html', 'resume/index.html'].find(path => existsSync(join(root, path)));
if (hasBundle && !resume) throw new Error('Missing built resume page');
const mime = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp'
};

function verifyProjectFilters() {
  const check = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const visibleProjects = section => Array.from(section.querySelectorAll('.project-card-item'))
    .filter(card => card.getClientRects().length > 0)
    .map(card => card.querySelector('.project-card-title a').pathname.split('/')[2]);
  const work = document.querySelector('[aria-labelledby="professional-projects-heading"]');
  const personal = document.querySelector('[aria-labelledby="personal-projects-heading"]');
  const group = work.querySelector('[role="group"][aria-label="Professional work filters"]');
  const buttons = Array.from(group.querySelectorAll('button'));
  const all = ['aks-migration', 'datatableview', 'ci-cd-performance', 'deal-monitoring-ui',
    'unified-reporting-ui', 'reporting-copilot-chat-integration', 'v1-to-v2-deal-migration-api'];
  const cases = [
    ['All', all],
    ['Product UI', ['datatableview', 'deal-monitoring-ui', 'unified-reporting-ui']],
    ['Platform & delivery', ['aks-migration', 'ci-cd-performance']],
    ['APIs & integrations', ['v1-to-v2-deal-migration-api']],
    ['AI prototype', ['reporting-copilot-chat-integration']]
  ];
  check(buttons.length === cases.length, 'Expected five professional filter buttons');
  check(JSON.stringify(visibleProjects(work)) === JSON.stringify(all), 'All work cards should start visible in featured order');
  check(buttons[0].getAttribute('aria-pressed') === 'true' &&
    buttons.slice(1).every(button => button.getAttribute('aria-pressed') === 'false'), 'All should start selected');
  const personalInitial = visibleProjects(personal);
  for (const index of [1, 2, 3, 4, 0]) {
    const [label, projects] = cases[index];
    const button = buttons[index];
    check(button.textContent.trim() === label && button.type === 'button' && button.tabIndex === 0 &&
      button.getAttribute('aria-controls') === 'professional-projects-grid', `Invalid ${label} control`);
    button.focus();
    check(document.activeElement === button, `${label} cannot receive keyboard focus`);
    button.click();
    check(buttons.every(candidate => candidate.getAttribute('aria-pressed') === String(candidate === button)),
      `Incorrect selected state for ${label}`);
    check(JSON.stringify(visibleProjects(work)) === JSON.stringify(projects), `Incorrect cards or order for ${label}`);
    check(JSON.stringify(visibleProjects(personal)) === JSON.stringify(personalInitial),
      `${label} changed the personal project list`);
  }
  buttons[1].click();
  personal.querySelector('[data-project-filter="tooling"]').click();
  check(JSON.stringify(visibleProjects(personal)) === JSON.stringify(['jsonresume-theme-wintermuted', 'wintermuted-ui-theme']),
    'Personal tooling filter stopped working');
  check(buttons[1].getAttribute('aria-pressed') === 'true' &&
    JSON.stringify(visibleProjects(work)) === JSON.stringify(cases[1][1]), 'Personal filter changed the work filter');
}

function verifyResumeColors(theme) {
  document.documentElement.dataset.theme = theme;
  document.body.dataset.theme = theme;
  document.body.classList.add('bg-tone-neutral');
  const article = document.querySelector('.compact-resume');
  if (!article) throw new Error('Missing compact resume');
  const luminance = color => {
    const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(value => {
      const channel = value / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const background = getComputedStyle(article).backgroundColor;
  if (background !== 'rgb(255, 255, 255)') throw new Error('Resume must retain its white background');
  for (const element of article.querySelectorAll('p, a')) {
    const color = getComputedStyle(element).color;
    const contrast = (Math.max(luminance(color), luminance(background)) + 0.05) /
      (Math.min(luminance(color), luminance(background)) + 0.05);
    if (contrast < 4.5) throw new Error(`${theme} resume ${element.tagName} contrast is ${contrast.toFixed(2)}:1`);
  }
}

const server = createServer((request, response) => {
  const { pathname, searchParams } = new URL(request.url, 'http://localhost');
  const relative = pathname === '/resume' ? resume : decodeURIComponent(pathname).replace(/^\/+/, '');
  let path = resolve(root, relative);
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html');
  if (!path.startsWith(`${root}${sep}`) || !existsSync(path)) {
    response.writeHead(404).end();
    return;
  }
  try {
    let data = readFileSync(path);
    if (pathname === '/projects/' && searchParams.has('verify-filters')) {
      data = data.toString('utf8').replace('</body>', `<script>
        window.addEventListener('load', function () {
          try {
            (${verifyProjectFilters.toString()})();
            document.body.setAttribute('data-filter-check', 'passed');
          } catch (error) {
            document.body.setAttribute('data-filter-check', error.message);
          }
        });
      </script></body>`);
    }
    if (pathname === '/resume' && searchParams.has('verify-colors')) {
      const theme = searchParams.get('theme') === 'dark' ? 'dark' : 'light';
      data = data.toString('utf8').replace('</body>', `<script>
        window.addEventListener('load', function () {
          try {
            (${verifyResumeColors.toString()})(${JSON.stringify(theme)});
            document.body.setAttribute('data-resume-color-check', 'passed');
          } catch (error) {
            document.body.setAttribute('data-resume-color-check', error.message);
          }
        });
      </script></body>`);
    }
    response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' }).end(data);
  } catch {
    response.writeHead(404).end();
  }
});
const temp = mkdtempSync(join(tmpdir(), 'site-resume-print-'));
const review = resolve('review-output');
mkdirSync(review, { recursive: true });
try {
  await new Promise(resolveListen => server.listen(0, '127.0.0.1', resolveListen));
  const url = `http://127.0.0.1:${server.address().port}/resume`;
  const output = join(review, 'site-resume-print.pdf');
  async function capture(name, flags, expected, target = url) {
    let diagnostics = '';
    let stdout = '';
    const code = await new Promise((resolveCapture, reject) => {
      const chrome = spawn(process.env.CHROME_BIN || 'google-chrome', [
        '--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
        '--disable-background-networking', '--no-first-run',
        '--no-proxy-server', '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE localhost, EXCLUDE 127.0.0.1',
        `--user-data-dir=${join(temp, name)}`, '--virtual-time-budget=3000', ...flags, target
      ], { stdio: ['ignore', 'pipe', 'pipe'] });
      chrome.stdout.on('data', data => { stdout += data.toString(); });
      chrome.stderr.on('data', data => { diagnostics += data.toString(); });
      chrome.on('error', reject);
      chrome.on('exit', resolveCapture);
    });
    if (code !== 0 || (expected && !existsSync(expected))) {
      throw new Error(`Chrome ${name} failed (exit ${code}):\n${diagnostics.slice(-12000)}`);
    }
    return stdout;
  }
  const failures = [];
  const projectUrl = `http://127.0.0.1:${server.address().port}/projects/`;
  const studyUrl = `http://127.0.0.1:${server.address().port}/projects/aks-migration/`;
  const filterDom = await capture('project-filters', ['--dump-dom'], null, `${projectUrl}?verify-filters`);
  const filterResult = filterDom.match(/<body\b[^>]*\bdata-filter-check="([^"]*)"/)?.[1];
  if (filterResult !== 'passed') throw new Error(`Professional project filter check failed: ${filterResult ?? 'no result'}`);
  console.log('Professional project filters preserve featured order and stay independent of personal filters.');
  const captures = [];
  if (hasBundle) {
    for (const theme of ['light', 'dark']) {
      const colorDom = await capture(`resume-colors-${theme}`, ['--dump-dom'], null, `${url}?verify-colors&theme=${theme}`);
      const colorResult = colorDom.match(/<body\b[^>]*\bdata-resume-color-check="([^"]*)"/)?.[1];
      if (colorResult !== 'passed') throw new Error(`Resume color check failed: ${colorResult ?? 'no result'}`);
    }
    captures.push(['print', ['--no-pdf-header-footer', `--print-to-pdf=${output}`], output, `${url}?verify-colors&theme=dark`]);
    if (process.argv.includes('--captures')) captures.push(
      ['desktop', ['--window-size=1440,1000', `--screenshot=${join(review, 'resume-desktop.png')}`], join(review, 'resume-desktop.png')],
      ['mobile', ['--window-size=390,844', `--screenshot=${join(review, 'resume-mobile.png')}`], join(review, 'resume-mobile.png')],
      ['dark', ['--window-size=1440,1000', `--screenshot=${join(review, 'resume-dark.png')}`], join(review, 'resume-dark.png'), `${url}?verify-colors&theme=dark`]
    );
  } else {
    console.log('Resume bundle is pending; print check skipped.');
  }
  if (process.argv.includes('--captures')) captures.push(
    ['projects-desktop', ['--window-size=1440,1000', `--screenshot=${join(review, 'projects-desktop.png')}`], join(review, 'projects-desktop.png'), projectUrl],
    ['projects-mobile', ['--window-size=390,844', `--screenshot=${join(review, 'projects-mobile.png')}`], join(review, 'projects-mobile.png'), projectUrl],
    ['case-study-desktop', ['--window-size=1440,1000', `--screenshot=${join(review, 'case-study-desktop.png')}`], join(review, 'case-study-desktop.png'), studyUrl],
    ['case-study-mobile', ['--window-size=390,844', `--screenshot=${join(review, 'case-study-mobile.png')}`], join(review, 'case-study-mobile.png'), studyUrl]
  );
  for (const [name, flags, expected, target] of captures) {
    try { await capture(name, flags, expected, target); } catch (error) { failures.push(error.message); }
  }
  if (failures.length) throw new Error(failures.join('\n'));
  if (hasBundle) {
    const info = execFileSync('pdfinfo', [output], { encoding: 'utf8' });
    const count = Number(info.match(/^Pages:\s+(\d+)/m)?.[1]);
    if (count !== 2) throw new Error(`Built site resume printed ${count || 'an unknown number of'} pages; expected 2`);
    const text = execFileSync('pdftotext', ['-layout', output, '-'], { encoding: 'utf8' });
    for (const phrase of ['Jameson Nyeholt', 'Microsoft', 'DataTableView']) {
      if (!text.includes(phrase)) throw new Error(`Printed resume is missing ${phrase}`);
    }
    for (const phrase of ['Download resume PDF', 'Project links', 'Proudly built']) {
      if (text.includes(phrase)) throw new Error(`Site chrome appeared in print: ${phrase}`);
    }
    console.log('Built site resume prints to two pages without site chrome, with readable light/dark theme colors.');
  }
} finally {
  server.close();
  rmSync(temp, { recursive: true, force: true });
}
