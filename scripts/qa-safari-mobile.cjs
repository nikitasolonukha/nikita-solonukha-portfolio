const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const { webkit } = require('playwright');

const dist = path.resolve(__dirname, '../dist');
const version = '20260925-white-shirt';
const assets = ['styles.css', 'editorial.css', 'motion.css', 'app.js', 'motion.js', 'public-final.css'];
const errors = [];

for (const directory of ['site', 'review']) {
  for (const name of fs.readdirSync(path.join(dist, directory)).filter(name => name.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(dist, directory, name), 'utf8');
    if (directory === 'site') {
      for (const asset of assets) {
        if (html.includes(`${asset}?v=`) && !html.includes(`${asset}?v=${version}`)) errors.push(`${name}: stale ${asset}`);
      }
      if (/href="\/(?:contact|work|archive|case-[^"]+)\.html"/.test(html)) errors.push(`${name}: root-relative site link`);
    }
    for (const link of html.matchAll(/<(?:a|button)\b[^>]*>[\s\S]*?<\/(?:a|button)>/g)) {
      if (/[↗↖←↑][\uFE0E\uFE0F]?/u.test(link[0])) errors.push(`${directory}/${name}: Unicode action arrow`);
    }
  }
}
if (/content:\s*["'](?:↗|↖|←|↑)/u.test(fs.readFileSync(path.join(dist, 'site/styles.css'), 'utf8'))) errors.push('Unicode CSS arrow');
if (errors.length) throw new Error(errors.join('\n'));

const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm' };
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
  const relative = pathname === '/' ? 'site/index.html' : pathname.replace(/^\//, '').replace(/\/$/, '/index.html');
  const file = path.resolve(dist, relative);
  if (!file.startsWith(dist + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (error, body) => {
    if (error) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }).end(body);
  });
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}/site/`;
  const browser = await webkit.launch();
  try {
    for (const [width, height] of [[390, 844], [393, 852], [430, 932]]) {
      const page = await browser.newPage({ viewport: { width, height }, isMobile: true, hasTouch: true });
      const jsErrors = [];
      page.on('pageerror', error => jsErrors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') jsErrors.push(message.text()); });
      const go = async file => {
        await page.goto(base + file, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(450);
      };
      const check = async label => {
        await page.waitForLoadState('domcontentloaded');
        await page.evaluate(() => document.fonts.ready);
        const state = await page.evaluate(() => {
          const email = document.querySelector('.contact-methods a[href^="mailto:"] span:last-child');
          const rect = email?.getBoundingClientRect();
          const style = email && getComputedStyle(email);
          return {
            path: location.pathname,
            overlay: [...document.querySelectorAll('.page-transition')].some(el => getComputedStyle(el).display !== 'none'),
            overflow: document.documentElement.scrollWidth > innerWidth + 1,
            media760: matchMedia('(max-width:760px)').matches,
            clientWidth: document.documentElement.clientWidth,
            offenders: document.documentElement.scrollWidth > innerWidth + 1 ? [...document.querySelectorAll('body *')].filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.right > innerWidth + 1 && getComputedStyle(el).position !== 'fixed'; }).slice(0, 12).map(el => ({ tag: el.tagName, className: String(el.className).slice(0, 80), parent: String(el.parentElement?.className).slice(0, 80), text: el.textContent.slice(0, 65), width: Math.round(el.getBoundingClientRect().width), right: Math.round(el.getBoundingClientRect().right), flex: getComputedStyle(el).flex, minWidth: getComputedStyle(el).minWidth, whiteSpace: getComputedStyle(el).whiteSpace, inline: el.getAttribute('style'), parentWidth: Math.round(el.parentElement.getBoundingClientRect().width) })) : [],
            hiddenContent: [...document.querySelectorAll('.intro-statement h2,.selected-heading h2,.page-intro h1,.case-title h1,.featured,.project-row,.case-cover')].filter(el => getComputedStyle(el).opacity === '0').length,
            unicodeActions: [...document.querySelectorAll('a,button')].filter(el => /[↗↖←↑]/u.test(el.textContent)).length,
            emailFits: !email || (style.whiteSpace === 'nowrap' && email.scrollWidth <= rect.width + 1),
            emailSize: email && { scroll: email.scrollWidth, width: Math.round(rect.width), font: style.fontSize, whiteSpace: style.whiteSpace },
          };
        });
        if (state.overlay || state.overflow || state.hiddenContent || state.unicodeActions || !state.emailFits || jsErrors.length) {
          errors.push(`${width}x${height} ${label}: ${JSON.stringify({ ...state, jsErrors })}`);
        }
      };

      await go('');
      await check('home');
      await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
      await check('home footer');
      await page.getByRole('link', { name: 'Открыть кейс AI Sales Assistant' }).click();
      await check('AI Sales');
      await page.goBack();
      await check('back from AI Sales');
      await page.getByRole('link', { name: 'Открыть кейс Shopify Store Builder' }).click();
      await check('Shopify');
      await page.goBack();
      await check('back from Shopify');
      await page.getByRole('link', { name: 'Открыть кейс PP BOT' }).click();
      await check('PP BOT');

      await go('work.html');
      await page.getByRole('link', { name: 'Открыть кейс AI Support' }).click();
      await check('AI Support');
      await page.locator('.support-hero-top a[href="work.html"]').click();
      await check('work return');
      await go('case-copilot.html');
      await check('n8n Copilot');
      await go('contact.html');
      await check('contact');
      if (process.env.QA_SHOTS && width === 390) await page.screenshot({ path: path.join(os.tmpdir(), 'portfolio-safari-contact-390.png') });
      await page.goBack();
      await check('back from contact');

      await go('');
      await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
      await page.getByRole('link', { name: 'Контакт Написать' }).click();
      await check('footer contact');
      await page.goBack();
      await check('back from footer contact');
      console.log(`WebKit ${width}x${height}: checked`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
})().catch(error => { errors.push(error.stack || error.message); }).finally(() => {
  server.close();
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log('WebKit mobile QA passed');
});
