import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const site = path => new URL(`site/${path}`, root);
const projects = JSON.parse(fs.readFileSync(new URL('portfolio/data.json', root), 'utf8')).filter(p => p.published !== false);
const byId = id => projects.find(p => p.id === id);
const selectedIds = ['legal-automation','shopify-store-builder','support-rag','ppbot','meta-ads','maps-lead-generator','portnoy'];
const workIds = ['legal-automation','shopify-store-builder','support-rag','ppbot','meta-ads','maps-lead-generator','internal-legal','vibe-autorouter','portnoy','pifpaf','ritm','magnum','garmony','protective-structures','photo-animation'];
const reviewIds = new Set(['roulette','photo-animation','ep-beauty','trekpodarok','skazka','topgadalkin']);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const href = id => reviewIds.has(id) ? `../review/${id}.html` : `case-${id}.html`;
const image = p => `../portfolio/${p.desktop}`;
const ppbotCover = src => `<div class="ppbot-editorial"><div class="ppbot-editorial-copy"><span class="ppbot-editorial-label">PP BOT / ПЕРВЫЕ 3 ДНЯ</span><strong>Запуск,<br>за которым<br>стоят продажи.</strong><div class="ppbot-editorial-metrics"><div><b>111</b><span>пользователей</span></div><div><b>28</b><span>оплат</span></div><div><b>≈25%</b><span>в покупку</span></div></div></div><div class="ppbot-editorial-media"><img src="${src}" alt="Реальный Telegram-сценарий PP BOT: меню и выбор приёма пищи" loading="lazy"></div></div>`;
function replaceBlock(file, content) {
  const path = site(file);
  let html = fs.readFileSync(path, 'utf8');
  const marker = /<!-- STATIC_CONTENT_START -->[\s\S]*?<!-- STATIC_CONTENT_END -->/;
  if (!marker.test(html)) throw new Error(`Static block missing: ${file}`);
  html = html.replace(marker, `<!-- STATIC_CONTENT_START -->${content}<!-- STATIC_CONTENT_END -->`);
  fs.writeFileSync(path, html);
}
const selected = selectedIds.map(byId).filter(Boolean);
const presentationIds = new Set(['legal-automation','internal-legal','support-rag','telegram-leads','telegram-schedule','telegram-intel','twitter-automation','vibe-autorouter','gigant','personal-assistant','news-aggregator-archive','copilot','university-projects','linux-lab']);
replaceBlock('index.html', selected.map((p,i) => `<article class="featured"><a class="featured-image${presentationIds.has(p.id) ? ' is-presentation' : ''}" data-project="${esc(p.id)}" href="${href(p.id)}" aria-label="Открыть кейс ${esc(p.name)}">${p.id === 'ppbot' ? ppbotCover(esc(image(p))) : `<img src="${esc(image(p))}" alt="${esc(p.shortDescription || p.name)}" loading="${i ? 'lazy' : 'eager'}">`}</a><div class="featured-copy"><div><span class="featured-index">${String(i+1).padStart(2,'0')} / ${String(selected.length).padStart(2,'0')}</span><span>${esc(p.category)}</span></div><h3><a href="${href(p.id)}">${esc(p.name)} <span aria-hidden="true">↗</span></a></h3><p>${esc(p.shortDescription || p.subtitle)}</p></div></article>`).join(''));
const role = {'Сайты':'Дизайн и разработка','Продукты':'Продукт и разработка','Автоматизация':'Архитектура и интеграции','Автоматизации':'Архитектура и интеграции','AI':'AI и интеграции','Исследования':'Исследование'};
const row = p => `<a class="project-row" href="${href(p.id)}" aria-label="Открыть кейс ${esc(p.name)}"><span class="project-row-name"><strong>${esc(p.shortTitle || p.name)}</strong><small>${esc(p.shortDescription || p.subtitle)}</small></span><span class="project-row-category">${esc(p.category)}</span><span class="project-row-type">${esc(role[p.category] || 'Разработка')}</span><span class="project-row-evidence">${p.id === 'internal-legal' || p.id === 'legal-automation' ? 'NDA' : 'Кейс'}</span></a>`;
const work = workIds.map(byId).filter(Boolean);
replaceBlock('work.html', work.map(row).join(''));
const workPath = site('work.html');
let workHtml = fs.readFileSync(workPath, 'utf8');
workHtml = workHtml.replace(/(<button type="button" data-kind="all" aria-pressed="true">Все <span>)\d+(<\/span><\/button>)/, (_,before,after) => `${before}${work.length}${after}`);
fs.writeFileSync(workPath, workHtml);
const homePath = site('index.html');
let homeHtml = fs.readFileSync(homePath,'utf8');
homeHtml = homeHtml.replace(/(<a class="all-work-link"[\s\S]*?<span>)\d+ проектов /,(_,before) => `${before}${work.length} проектов `);
fs.writeFileSync(homePath,homeHtml);
const archiveProjects = projects.filter(p => !workIds.includes(p.id));
replaceBlock('archive.html', archiveProjects.map(row).join(''));
const archivePath = site('archive.html');
let archiveHtml = fs.readFileSync(archivePath,'utf8');
archiveHtml = archiveHtml.replace(/(<h1>Архив <small>\()\d+(\)<\/small>)/,(_,before,after) => `${before}${archiveProjects.length}${after}`);
fs.writeFileSync(archivePath,archiveHtml);
for (const p of projects) {
  if (reviewIds.has(p.id)) continue;
  const target = site(`case-${p.id}.html`);
  if (!fs.existsSync(target)) continue;
  const html = fs.readFileSync(target, 'utf8');
  const fallback = /<main id="main"><div id="case-root">[\s\S]*?<\/main>/;
  if (!html.includes('class="case-fallback shell"')) continue;
  if (!fallback.test(html)) continue;
  const facts = [['Задача',p.problem],['Что я сделал',p.built],['Результат',p.result],['Польза',p.businessValue]];
  const impact = p.id === 'ppbot' ? '<div class="ppbot-impact" aria-label="Результаты первых трёх дней"><div><strong>111</strong><span>пользователей</span></div><div><strong>28</strong><span>оплат</span></div><div><strong>≈25%</strong><span>конверсия в оплату</span></div></div>' : '';
  const content = `<div class="case-fallback shell"><h1>${esc(p.name)}</h1><p>${esc(p.caseIntro || p.intro)}</p>${impact}${facts.map(([title,value]) => `<h2>${title}</h2><p>${esc(value)}</p>`).join('')}</div>`;
  fs.writeFileSync(target, html.replace(fallback, `<main id="main"><div id="case-root">${content}</div></main>`));
}
const publicText = ['# Публичные тексты портфолио','','Публичная версия. Источником отображаемых текстов служит `portfolio/data.json`.',''];
for (const p of projects) publicText.push(`## ${p.name}`,'',`PROJECT: ${p.name}`,`WHAT IT IS: ${p.caseIntro || p.intro}`,`RESULT: ${p.result}`,`BUSINESS VALUE: ${p.businessValue}`,`MY ROLE: ${p.built}`,'');
fs.writeFileSync(new URL('PUBLIC_CONTENT.md', root), publicText.join('\n'));
console.log(`Static shell synced: ${selected.length} selected, ${work.length} work, ${projects.length-work.length} archive`);
