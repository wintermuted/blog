import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join, resolve, sep } from 'node:path';

if (!existsSync('resume-bundle')) {
  console.log('Resume bundle is pending; print check skipped.');
  process.exit(0);
}

const root = resolve('_site');
const resume = ['resume.html', 'resume/index.html'].find(path => existsSync(join(root, path)));
if (!resume) throw new Error('Missing built resume page');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2' };
const server = createServer((request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const relative = pathname === '/resume' ? resume : decodeURIComponent(pathname).replace(/^\/+/, '');
  const path = resolve(root, relative);
  if (!path.startsWith(`${root}${sep}`) || !existsSync(path)) {
    response.writeHead(404).end();
    return;
  }
  try {
    const data = readFileSync(path);
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
  async function capture(name, flags, expected) {
    let diagnostics = '';
    const code = await new Promise((resolveCapture, reject) => {
      const chrome = spawn('google-chrome', [
        '--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
        '--disable-background-networking', '--no-first-run',
        '--no-proxy-server', '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE localhost, EXCLUDE 127.0.0.1',
        `--user-data-dir=${join(temp, name)}`, '--virtual-time-budget=3000', ...flags, url
      ], { stdio: ['ignore', 'pipe', 'pipe'] });
      chrome.stdout.on('data', data => { diagnostics += data.toString(); });
      chrome.stderr.on('data', data => { diagnostics += data.toString(); });
      chrome.on('error', reject);
      chrome.on('exit', resolveCapture);
    });
    if (code !== 0 || !existsSync(expected)) {
      throw new Error(`Chrome ${name} failed (exit ${code}, output ${existsSync(expected) ? 'present' : 'missing'}):\n${diagnostics.slice(-12000)}`);
    }
  }
  const failures = [];
  for (const [name, flags, expected] of [
    ['print', ['--no-pdf-header-footer', `--print-to-pdf=${output}`], output],
    ['desktop', ['--window-size=1440,1000', `--screenshot=${join(review, 'resume-desktop.png')}`], join(review, 'resume-desktop.png')],
    ['mobile', ['--window-size=390,844', `--screenshot=${join(review, 'resume-mobile.png')}`], join(review, 'resume-mobile.png')]
  ]) {
    try { await capture(name, flags, expected); } catch (error) { failures.push(error.message); }
  }
  if (failures.length) throw new Error(failures.join('\n'));
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
  console.log('Built site resume prints to two pages without site chrome.');
} finally {
  server.close();
  rmSync(temp, { recursive: true, force: true });
}
