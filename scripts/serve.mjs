import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { root, port, projectId, stopPath } from './preview-config.mjs';

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
};
const insideRoot = path => path === root || path.startsWith(root + sep);

const server = createServer(async (request, response) => {
  const reply = (status, text, headers = {}) => {
    response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
    response.end(request.method === 'HEAD' ? undefined : text);
  };
  if (request.method === 'POST' && request.url === stopPath) {
    // A custom header prevents cross-origin browser requests from stopping the server.
    if (request.headers.origin || request.headers['x-preview-project'] !== projectId) {
      reply(403, 'Forbidden');
      return;
    }
    response.once('finish', () => {
      server.close(() => console.log('Preview server stopped.'));
      server.closeAllConnections();
    });
    reply(200, 'Preview server stopped.');
    return;
  }
  if (!['GET', 'HEAD'].includes(request.method)) {
    reply(405, 'Method not allowed', { Allow: 'GET, HEAD' });
    return;
  }
  try {
    const url = new URL(request.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.includes('\0')) { reply(400, 'Bad request'); return; }
    if (pathname.split('/').some(part => part.startsWith('.'))) {
      reply(403, 'Forbidden'); return;
    }
    let file = await realpath(resolve(root, '.' + pathname));
    if (!insideRoot(file)) { reply(403, 'Forbidden'); return; }
    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith('/')) {
        reply(301, 'Redirecting', { Location: url.pathname + '/' + url.search });
        return;
      }
      file = await realpath(resolve(file, 'index.html'));
      if (!insideRoot(file)) { reply(403, 'Forbidden'); return; }
    }
    if (!(await stat(file)).isFile()) { reply(404, 'Not found'); return; }
    const content = await readFile(file);
    response.writeHead(200, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'Content-Length': content.length,
      'Cache-Control': 'no-store',
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    if (error instanceof URIError || error.code === 'ERR_INVALID_URL') reply(400, 'Bad request');
    else if (['ENOENT', 'ENOTDIR'].includes(error.code)) reply(404, 'Not found');
    else if (error.code === 'EACCES') reply(403, 'Forbidden');
    else { console.error(error); reply(500, 'Server error'); }
  }
});

server.on('error', error => {
  console.error(`Preview server: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Preview: http://localhost:${server.address().port} (Ctrl+C or npm stop to stop)`);
});
