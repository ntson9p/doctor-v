// Serves a built site as a plain static host would, for the end-to-end tests. Unlike `astro preview`,
// it runs alongside a preview opened for phone testing (`npm run web:phone`).
// Usage: node scripts/serve-dist.mjs <port> [folder, default dist-test]
import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const port = Number(process.argv[2] ?? 4329);
const folder = process.argv[3] ?? 'dist-test';
const root = fileURLToPath(new URL(`../${folder}/`, import.meta.url));
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8',
};

/** The file for a URL path: the file itself, or the index.html of a folder. */
function fileFor(urlPath) {
  const path = normalize(join(root, decodeURIComponent(urlPath)));
  if (!path.startsWith(root)) return null;
  for (const candidate of [path, join(path, 'index.html')]) {
    try {
      if (statSync(candidate).isFile()) return candidate;
    } catch {
      // not there: try the next candidate
    }
  }
  return null;
}

createServer((req, res) => {
  let file = null;
  try {
    file = fileFor(new URL(req.url ?? '/', 'http://localhost').pathname);
  } catch {
    // a malformed URL: answer 404 below
  }
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found');
    return;
  }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`serving ${folder}/ on http://localhost:${port}`));
