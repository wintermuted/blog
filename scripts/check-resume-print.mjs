import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
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
try {
  await new Promise(resolveListen => server.listen(0, '127.0.0.1', resolveListen));
  const url = `http://127.0.0.1:${server.address().port}/resume`;
  const output = join(temp, 'resume.pdf');
  await new Promise((resolvePrint, reject) => {
    const chrome = spawn('google-chrome', [
      '--headless', '--disable-gpu', '--no-sandbox', '--disable-background-networking',
      '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE localhost',
      `--user-data-dir=${join(temp, 'chrome')}`, '--no-pdf-header-footer',
      '--virtual-time-budget=3000', `--print-to-pdf=${output}`, url
    ], { stdio: 'ignore' });
    chrome.on('error', reject);
    chrome.on('exit', code => code === 0 ? resolvePrint() : reject(new Error(`Chrome print failed: ${code}`)));
  });
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
