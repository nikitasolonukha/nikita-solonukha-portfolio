const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const base = (process.env.QA_BASE || 'http://127.0.0.1:4392/').replace(/\/+$/, '/');
const routes = fs.readFileSync(path.join(root, 'CASE_FULL_QA.md'), 'utf8')
  .split(/\r?\n/)
  .filter(line => /^\|[^-|]/.test(line) && !line.startsWith('| Project'))
  .map(line => line.split('|')[2].trim());

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const failures = [];
  try {
    for (const route of routes) {
      await page.goto(new URL(route, base).href, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => !document.querySelector('#case-root .case-fallback'), { timeout: 8000 });
      const result = await page.evaluate(() => {
        const follows = (a, b) => Boolean(a && b && (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING));
        const footer = document.querySelector('footer.site-footer,footer.portfolio-footer,footer.case-footer');
        const next = [...document.querySelectorAll('[class*="next"] a[href],.portfolio-chain-link')].find(e => {
          const name = e.getAttribute('href').split('/').pop().split('?')[0];
          return name.endsWith('.html') && !['work.html', 'contact.html', 'archive.html', 'about.html'].includes(name);
        });
        const links = [...document.querySelectorAll('a[href]')];
        const contact = links.find(e => /Связаться/i.test(e.textContent) && /contact\.html/.test(e.getAttribute('href')) && !e.closest('header,footer'));
        const allWork = links.find(e => /Все работы/i.test(e.textContent) && /work\.html/.test(e.getAttribute('href')) && follows(next, e) && follows(e, contact));
        return { next: next?.href || null, allWork: allWork?.href || null, contact: contact?.href || null, footer: Boolean(footer), correctOrder: follows(next, allWork) && follows(allWork, contact) && follows(contact, footer) };
      });
      if (!result.correctOrder) failures.push({ route, ...result });
      console.log(`${route}: ${result.correctOrder ? 'PASS' : 'FAIL'}`);
    }
    console.log(JSON.stringify({ checked: routes.length, failures }, null, 2));
    if (failures.length) process.exitCode = 1;
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
