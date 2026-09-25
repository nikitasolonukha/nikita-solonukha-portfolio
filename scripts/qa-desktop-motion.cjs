const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');

const dist = path.resolve(__dirname, '../dist');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.ttf': 'font/ttf' };
const server = http.createServer((req, res) => {
  const name = new URL(req.url, 'http://127.0.0.1').pathname.replace(/\/$/, '/index.html');
  const file = path.resolve(dist, `.${name}`);
  if (!file.startsWith(dist + path.sep)) return res.writeHead(403).end();
  fs.readFile(file, (error, body) => error ? res.writeHead(404).end() : res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }).end(body));
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = process.env.QA_URL || `http://127.0.0.1:${server.address().port}/site/`;
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base, { waitUntil: 'load' });
    const intro = page.locator('.intro-statement h2');
    await intro.waitFor();
    const before = await intro.evaluate(el => ({ ready: el.dataset.motionReady, opacity: getComputedStyle(el).opacity, y: el.getBoundingClientRect().y }));
    await intro.scrollIntoViewIfNeeded();
    await page.waitForTimeout(950);
    const after = await intro.evaluate(el => ({ opacity: getComputedStyle(el).opacity, transform: getComputedStyle(el).transform }));
    const motion = await page.evaluate(() => ({ gsap: !!window.gsap, trigger: !!window.ScrollTrigger, lenis: document.documentElement.classList.contains('lenis'), triggers: window.ScrollTrigger?.getAll().length || 0, overlay: !!document.querySelector('.page-transition') }));
    if (before.ready !== 'true' || after.opacity !== '1' || !motion.gsap || !motion.trigger || !motion.lenis || motion.triggers < 2 || !motion.overlay || errors.length) throw new Error(JSON.stringify({ before, after, motion, errors }));
    await page.evaluate(() => document.querySelector('.site-header a[href="work.html"]').click());
    await page.waitForTimeout(120);
    const exiting = await page.evaluate(() => ({ stored: sessionStorage.getItem('portfolio-transition'), y: getComputedStyle(document.querySelector('.page-transition')).transform }));
    await page.waitForURL('**/work.html');
    await page.waitForTimeout(700);
    const entered = await page.evaluate(() => ({ overlayTop: document.querySelector('.page-transition')?.getBoundingClientRect().top, viewport: innerHeight, stored: sessionStorage.getItem('portfolio-transition') }));
    if (exiting.stored !== '1' || entered.overlayTop < entered.viewport || errors.length) throw new Error(JSON.stringify({ exiting, entered, errors }));
    await page.goto(new URL('case-copilot.html', base).href, { waitUntil: 'load' });
    await page.waitForTimeout(750);
    const presentation = await page.locator('.pa-hero h1').evaluate(el => ({ ready: el.dataset.motionReady, opacity: getComputedStyle(el).opacity, triggers: window.ScrollTrigger?.getAll().length || 0, overlay: !!document.querySelector('.page-transition') }));
    if (presentation.ready !== 'true' || presentation.opacity !== '1' || presentation.triggers < 1 || !presentation.overlay || errors.length) throw new Error(JSON.stringify({ presentation, errors }));
    await page.evaluate(() => document.querySelector('.pa-hero a[href="work.html"]').click());
    await page.waitForURL('**/work.html');
    await page.waitForTimeout(700);
    const returnedTop = await page.locator('.page-transition').evaluate(el => el.getBoundingClientRect().top);
    if (returnedTop < 900 || errors.length) throw new Error(JSON.stringify({ returnedTop, errors }));
    console.log(JSON.stringify({ base, before, after, motion, exiting, entered, presentation, errors }));
    console.log('PASS: desktop ScrollTrigger reveal and page transition');
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; server.close(); });
