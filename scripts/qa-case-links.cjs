const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const base = (process.env.QA_BASE || 'http://127.0.0.1:4392/').replace(/\/+$/, '/');
const output = process.env.QA_OUTPUT || path.resolve(root, '../qa-output/case-links.json');
const routes = fs.readFileSync(path.join(root, 'CASE_FULL_QA.md'), 'utf8').split(/\r?\n/)
  .filter(line => /^\|[^-|]/.test(line) && !line.startsWith('| Project'))
  .map(line => line.split('|')[2].trim());

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const records = [];
  const links = new Set();
  try {
    for (const [index, route] of routes.entries()) {
      await page.goto(new URL(route, base).href, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => !document.querySelector('#case-root .case-fallback'), { timeout: 8000 });
      const data = await page.evaluate(() => {
        const candidates = [...document.querySelectorAll('[class*="next"] a[href],.portfolio-chain-link')];
        const next = candidates.find(e => {
          const name = e.getAttribute('href').split('/').pop().split('?')[0];
          return name.endsWith('.html') && !['work.html', 'contact.html', 'archive.html', 'about.html'].includes(name);
        });
        const all = [...document.querySelectorAll('a[href]')].map(e => e.href)
          .filter(href => href.startsWith(location.origin) && !href.includes('#'));
        return { next: next?.href || null, all };
      });
      for (const link of data.all) links.add(link);
      let transition = null;
      if (data.next) {
        try {
          await page.evaluate(href => {
            const e = [...document.querySelectorAll('a[href]')].find(a => a.href === href && a.closest('[class*="next"],.portfolio-chain'));
            if (!e) throw new Error('Next anchor not found');
            e.click();
          }, data.next);
          await page.waitForURL(data.next, { timeout: 12000 });
          await page.waitForTimeout(900);
          transition = await page.evaluate(() => ({ url: location.href, mainText: document.querySelector('main')?.innerText.trim().length || 0, mainOpacity: getComputedStyle(document.querySelector('main')).opacity }));
        } catch (error) { transition = { error: error.message }; }
      }
      records.push({ route, next: data.next, expectedNext: new URL(routes[(index + 1) % routes.length], base).href, transition });
      console.log(`${records.length}/${routes.length} ${route}: ${transition?.error || transition?.mainText || 'no next'}`);
    }
    const statuses = [];
    for (const link of links) {
      try {
        const response = await fetch(link, { method: 'HEAD', signal: AbortSignal.timeout(12000) });
        statuses.push({ link, status: response.status });
      } catch (error) { statuses.push({ link, error: error.message }); }
    }
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, JSON.stringify({ base, records, statuses }, null, 2));
    const broken = statuses.filter(x => x.error || x.status >= 400);
    const navigation = records.filter(x => !x.next || x.next !== x.expectedNext || x.transition?.error || x.transition?.mainText < 100 || x.transition?.mainOpacity === '0');
    console.log(JSON.stringify({ routes: records.length, localLinks: statuses.length, broken, navigation }, null, 2));
    if (broken.length || navigation.length) process.exitCode = 1;
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
