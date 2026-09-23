import fs from 'node:fs';
import path from 'node:path';

const dir = new URL('../site/', import.meta.url);
const excluded = /не подтверж|не провер|не восстанов|недоступ|\blocal\b|локальн|\bdemo\b|демо\b|\bmock\b|\breplay\b|\bverified\b|\bunverified\b|\bPASS\b|\bSKIP\b|overflow|fixture|\b(?:1440|768|390)\b|исходник не найден|production не заявляется|автор подтвердил/i;
let count = 0;
for (const name of fs.readdirSync(dir).filter(x => x.endsWith('.html'))) {
  const html = fs.readFileSync(new URL(name, dir), 'utf8');
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, '\n').replace(/&nbsp;/g, ' ');
  const lines = visible.split('\n').map(x => x.trim()).filter(x => excluded.test(x));
  for (const line of lines) { console.log(`${name}: ${line.slice(0, 180)}`); count++; }
}
console.log(`Visible public HTML audit: ${count} findings`);
if (count) process.exitCode = 1;
