import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const projects = JSON.parse(fs.readFileSync(path.join(root, 'portfolio/data.json'), 'utf8'));
const reviewIds = new Set(['roulette', 'trekpodarok', 'ep-beauty', 'skazka', 'topgadalkin']);
const reviewRoutes = new Set(['roulette', 'photo-animation', 'ep-beauty', 'trekpodarok', 'skazka', 'topgadalkin']);
const themes = {
  roulette: ['#110f0fee', '#e8ddca', '#d7aa63', '#e8ddca40', '#e8ddca', '#110f0f', '#8a7563', '#4f1f1b', '#e8ddca'],
  trekpodarok: ['#121410ee', '#eee9dd', '#e5965d', '#eee9dd40', '#eee9dd', '#121410', '#676b60', '#282d25', '#eee9dd'],
  'ep-beauty': ['#f3efe7f2', '#2b241f', '#a47d65', '#cfc3b6', '#2b241f', '#f3efe7', '#c4b6a9', '#fffaf2', '#2b241f'],
  skazka: ['#132b2bee', '#f0ebdf', '#d8aa5d', '#f0ebdf40', '#f0ebdf', '#132b2b', '#5f746e', '#1b3938', '#f0ebdf'],
  topgadalkin: ['#130f17ee', '#eee8df', '#d8b9e3', '#eee8df40', '#eee8df', '#130f17', '#766580', '#2b1d36', '#eee8df'],
};
const names = ['header-bg', 'header-ink', 'accent', 'rule', 'next-bg', 'next-ink', 'next-muted', 'contact-bg', 'contact-ink'];
const route = id => reviewRoutes.has(id) ? `${id}.html` : `../site/case-${id}.html`;
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const menu = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8h16M4 16h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
const header = `<a class="portfolio-skip" href="#main">К содержанию</a><header class="portfolio-header"><div class="wrap portfolio-header-inner"><a class="portfolio-brand" href="../site/" aria-label="Никита Солонуха — главная">Никита <span>Солонуха</span></a><nav class="portfolio-nav" aria-label="Главная навигация"><a class="portfolio-nav-work" href="../site/work.html">Работы</a><a href="../site/about.html">Обо мне</a><a href="../site/archive.html">Архив</a><a href="../site/contact.html">Контакт</a></nav><details class="portfolio-mobile-menu"><summary aria-label="Открыть меню">${menu}</summary><nav class="portfolio-mobile-nav" aria-label="Мобильная навигация"><a href="../site/work.html">Работы</a><a href="../site/about.html">Обо мне</a><a href="../site/archive.html">Архив</a><a href="../site/contact.html">Контакт</a></nav></details></div></header>`;

const replaceOnce = (html, marker, replacement, file) => {
  if (html.split(marker).length !== 2) throw new Error(`Expected one ${marker} in ${file}`);
  return html.replace(marker, replacement);
};

for (const id of reviewIds) {
  const index = projects.findIndex(project => project.id === id);
  if (index < 0) throw new Error(`Unknown project: ${id}`);
  const next = projects[(index + 1) % projects.length];
  const file = path.join(root, 'review', `${id}.html`);
  const style = themes[id].map((value, index) => `--portfolio-${names[index]}:${value}`).join(';');
  const footer = `</main><section class="portfolio-next" aria-labelledby="portfolio-next-heading"><div class="wrap"><span class="portfolio-next-label">Следующий проект</span><a class="portfolio-next-link" href="${route(next.id)}"><span class="portfolio-next-title" id="portfolio-next-heading">${escape(next.name)}</span><span class="portfolio-next-arrow" aria-hidden="true">${arrow}</span></a><div class="portfolio-next-bottom"><span>${escape(next.category)}</span><a href="../site/work.html">Все работы</a></div></div></section><section class="portfolio-contact"><div class="wrap"><div><p>Есть задача?</p><h2>Давайте<br>обсудим.</h2></div><a href="../site/contact.html">Связаться ${arrow}</a></div></section><footer class="portfolio-footer"><div class="wrap"><span>Никита Солонуха · цифровые продукты</span><a href="../site/work.html">Все работы</a></div></footer><script src=`;
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('class="portfolio-header"')) {
    html = replaceOnce(html, '</style>', '</style><link rel="stylesheet" href="case-navigation.css?v=20260924">', file);
    html = replaceOnce(html, '<body><main>', `<body style="${style}">${header}<main id="main">`, file);
    html = replaceOnce(html, '</main><script src=', footer, file);
    fs.writeFileSync(file, html);
  }
  if (!html.includes(`class="portfolio-next-link" href="${route(next.id)}"`) || !html.includes('class="portfolio-footer"')) {
    throw new Error(`Navigation incomplete: ${file}`);
  }
  console.log(`${id} → ${next.id}`);
}
