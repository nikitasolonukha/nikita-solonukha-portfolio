import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const projects = JSON.parse(fs.readFileSync(new URL('portfolio/data.json', root), 'utf8'));
const reviewRoutes = new Set(['roulette','photo-animation','ep-beauty','trekpodarok','skazka','topgadalkin']);
const publicFields = ['subtitle','shortDescription','intro','caseIntro','problem','built','result','businessValue','statusLabel','seoDescription'];
const forbidden = /не подтвержд|не проверен|не восстановлен|исходник не найден|исторический аккаунт недоступен|локальный replay|локально проверен|\bmock\b|\bdemo\b|\breplay\b|\btests? pass\b|page errors|overflow|390\s*[/,]\s*768|исходный workflow не найден|что подтверждено|не показано как live|гран(ица|ицы) фактов|provenance\s*\/\s*qa|source-checked/i;
const failures = [];

for (const p of projects) {
  for (const field of publicFields) {
    if (forbidden.test(String(p[field] || ''))) failures.push(`${p.id}: ${field} contains internal language`);
  }
  if (!p.businessValue || !p.result || !p.statusLabel) failures.push(`${p.id}: missing public result/value/status`);
  const route = reviewRoutes.has(p.id) ? `review/${p.id}.html` : `site/case-${p.id}.html`;
  const file = new URL(route, root);
  if (!fs.existsSync(file)) { failures.push(`${p.id}: missing ${route}`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, '\n').replace(/&nbsp;/g, ' ');
  for (const line of visible.split('\n').map(s => s.trim()).filter(Boolean)) {
    if (forbidden.test(line)) failures.push(`${route}: ${line.slice(0, 130)}`);
  }
}
const renderer = fs.readFileSync(new URL('site/app.js', root), 'utf8');
if (/item\.(?:proof|boundary)/.test(renderer)) failures.push('site/app.js renders internal evidence');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Public copy: ${projects.length} projects, ${projects.length} case routes, 0 internal-copy findings.`);
}
