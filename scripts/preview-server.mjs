import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.mp4':'video/mp4','.webm':'video/webm'};
http.createServer((req,res) => {
  const requestPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const filename = path.resolve(root, '.' + (requestPath.endsWith('/') ? `${requestPath}index.html` : requestPath));
  if (filename !== root && !filename.startsWith(root + path.sep)) {res.writeHead(403).end();return;}
  fs.stat(filename, (error,stat) => {
    if (error || !stat.isFile()) {res.writeHead(404).end();return;}
    res.setHeader('Content-Type', mime[path.extname(filename)] || 'application/octet-stream');
    fs.createReadStream(filename).pipe(res);
  });
}).listen(4392,'127.0.0.1',() => console.log('Preview: http://127.0.0.1:4392/site/'));
