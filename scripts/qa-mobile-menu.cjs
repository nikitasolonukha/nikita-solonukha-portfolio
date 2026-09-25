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
      try {
        await page.goto(new URL(route, base).href, { waitUntil: 'domcontentloaded' });
        const details = page.locator('details.case-mobile-menu,details.portfolio-mobile-menu').first();
        const button = await details.count()
          ? details.locator('summary')
          : page.locator('button[aria-controls="mobile-nav"],button[aria-label="Открыть меню"]').first();
        if (await button.count() !== 1) throw new Error('Mobile menu button missing');
        const nav = await details.count() ? details.locator('nav') : page.locator('#mobile-nav');
        await button.click();
        if (!await nav.isVisible() || (await details.count() ? !await details.evaluate(e => e.open) : await button.getAttribute('aria-expanded') !== 'true')) {
          throw new Error('Mobile menu did not open');
        }
        const names = await nav.locator('a').allTextContents();
        for (const name of ['Работы', 'Обо мне', 'Архив', 'Контакт']) {
          if (!names.some(text => text.includes(name))) throw new Error(`Missing ${name} menu link`);
        }
        await button.click();
        if (await nav.isVisible() || (await details.count() ? await details.evaluate(e => e.open) : await button.getAttribute('aria-expanded') !== 'false')) {
          throw new Error('Mobile menu did not close');
        }
      } catch (error) {
        failures.push({ route, error: error.message });
      }
      console.log(`${route}: ${failures.at(-1)?.route === route ? 'FAIL' : 'PASS'}`);
    }
    console.log(JSON.stringify({ checked: routes.length, failures }, null, 2));
    if (failures.length) process.exitCode = 1;
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
