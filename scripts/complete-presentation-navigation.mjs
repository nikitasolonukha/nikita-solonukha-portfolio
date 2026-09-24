import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const projects = JSON.parse(fs.readFileSync(path.join(root, 'portfolio/data.json'), 'utf8'));
const reviewRoutes = new Set(['roulette', 'photo-animation', 'ep-beauty', 'trekpodarok', 'skazka', 'topgadalkin']);
const customNext = new Map([
  ['gigant', 'pn-gigant-next'], ['support-rag', 'support-next'],
  ['twitter-automation', 'twitter-next'], ['telegram-schedule', 'schedule-next'],
  ['telegram-intel', 'intel-next'], ['telegram-leads', 'leads-next'],
  ['legal-automation', 'sales-next'],
]);
const route = id => reviewRoutes.has(id) ? `../review/${id}.html` : `case-${id}.html`;
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

for (let index = 0; index < projects.length; index++) {
  const project = projects[index];
  if (reviewRoutes.has(project.id)) continue;
  const file = path.join(root, 'site', `case-${project.id}.html`);
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('id="case-root"')) continue; // The shared case renderer supplies navigation.
  if (customNext.has(project.id)) {
    html = html.replace(/<section class="portfolio-chain"[\s\S]*?<\/section>/, '');
    html = html.replace('<link rel="stylesheet" href="presentation-navigation.css?v=20260924">', '');
    if (!html.includes(`class="${customNext.get(project.id)} shell"`)) throw new Error(`Missing custom next case in ${file}`);
    fs.writeFileSync(file, html);
    console.log(`${project.id} → existing custom next case`);
    continue;
  }
  if (project.id === 'vibe-autorouter') {
    // Its old “next” block returned to the index; the chain below includes that link.
    html = html.replace(/<section class="vibe-next shell">[\s\S]*?<\/section>/, '');
  }
  const next = projects[(index + 1) % projects.length];
  if (!html.includes('class="portfolio-chain"')) {
    if (html.split('</head>').length !== 2 || html.split('</main>').length !== 2) throw new Error(`Unexpected markup in ${file}`);
    const section = `<section class="portfolio-chain" aria-labelledby="portfolio-chain-heading"><div class="shell"><span class="portfolio-chain-label">Следующий проект</span><a class="portfolio-chain-link" href="${route(next.id)}"><span class="portfolio-chain-title" id="portfolio-chain-heading">${escape(next.name)}</span><span class="portfolio-chain-arrow" aria-hidden="true">${arrow}</span></a><a class="portfolio-chain-all" href="work.html">Все работы</a></div></section>`;
    html = html.replace('</head>', '<link rel="stylesheet" href="presentation-navigation.css?v=20260924"></head>');
    html = html.replace('</main>', `${section}</main>`);
    fs.writeFileSync(file, html);
  }
  if (!html.includes(`class="portfolio-chain-link" href="${route(next.id)}"`)) throw new Error(`Navigation incomplete: ${file}`);
  console.log(`${project.id} → ${next.id}`);
}
