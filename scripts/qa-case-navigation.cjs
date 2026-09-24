const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { webkit } = require('playwright');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const projects = JSON.parse(fs.readFileSync(path.join(root, 'portfolio/data.json'), 'utf8'));
const reviewRoutes = new Set(['roulette', 'photo-animation', 'ep-beauty', 'trekpodarok', 'skazka', 'topgadalkin']);
const customNext = new Map([
  ['gigant', ['pn-gigant-next', 'personal-assistant']],
  ['support-rag', ['support-next', 'telegram-leads']],
  ['twitter-automation', ['twitter-next', 'vibe-autorouter']],
  ['telegram-schedule', ['schedule-next', 'twitter-automation']],
  ['telegram-intel', ['intel-next', 'telegram-leads']],
  ['telegram-leads', ['leads-next', 'telegram-schedule']],
  ['legal-automation', ['sales-next', 'support-rag']],
]);
const route = id => reviewRoutes.has(id) ? `/review/${id}.html` : `/site/case-${id}.html`;
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.webm': 'video/webm' };
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
  const file = path.resolve(dist, `.${pathname}`);
  if (!file.startsWith(dist + path.sep)) return res.writeHead(403).end();
  fs.readFile(file, (error, body) => {
    if (error) return res.writeHead(404).end();
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }).end(body);
  });
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await webkit.launch();
  const failures = [];
  try {
    for (const width of [390, 768, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 844 }, isMobile: width === 390, hasTouch: width === 390 });
      for (let index = 0; index < projects.length; index++) {
        const project = projects[index];
        const current = route(project.id);
        const expected = route(customNext.get(project.id)?.[1] || projects[(index + 1) % projects.length].id);
        const nextSelector = reviewRoutes.has(project.id) ? '.portfolio-next-link,.case-next-link' : customNext.has(project.id) ? `.${customNext.get(project.id)[0]} a` : '.portfolio-chain-link,.case-next > a:first-child';
        try {
          const response = await page.goto(origin + current, { waitUntil: 'domcontentloaded', timeout: 15000 });
          if (response.status() !== 200) throw new Error(`HTTP ${response.status()}`);
          await page.locator(nextSelector).waitFor({ state: 'visible', timeout: 10000 });
          const state = await page.evaluate(() => {
            const next = document.querySelector('.portfolio-next-link,.case-next-link,.pn-gigant-next a,.support-next a,.twitter-next a,.schedule-next a,.intel-next a,.leads-next a,.sales-next a,.portfolio-chain-link,.case-next > a:first-child');
            const header = document.querySelector('.portfolio-header,.case-header,.site-header');
            const footer = document.querySelector('.portfolio-footer,.case-footer,.site-footer');
            return {
              next: next ? new URL(next.getAttribute('href'), location.href).pathname : null,
              header: !!header && getComputedStyle(header).display !== 'none',
              workLink: !!header?.querySelector('a[href$="work.html"]'),
              footer: !!footer && getComputedStyle(footer).display !== 'none',
              overflow: document.documentElement.scrollWidth > innerWidth + 1,
              mobileMenu: !!document.querySelector('.portfolio-mobile-menu summary,.case-mobile-menu summary,.menu-toggle'),
            };
          });
          if (!state.header || !state.workLink || !state.footer || !state.mobileMenu || state.next !== expected || state.overflow) {
            failures.push(`${width} ${project.id}: ${JSON.stringify(state)} expected=${expected}`);
          }
          if (process.argv.includes('--capture') && width !== 768 && (reviewRoutes.has(project.id) || project.id === 'support-rag' || project.id === 'gigant')) {
            await page.screenshot({ path: path.join(os.tmpdir(), `case-nav-${project.id}-${width}-top.png`) });
            await page.locator(nextSelector).scrollIntoViewIfNeeded();
            await page.screenshot({ path: path.join(os.tmpdir(), `case-nav-${project.id}-${width}-bottom.png`) });
          }
          if (width === 390) {
            if (reviewRoutes.has(project.id)) {
              const summary = page.locator('.portfolio-mobile-menu summary,.case-mobile-menu summary');
              await summary.click();
              if (!await page.locator('.portfolio-mobile-menu[open],.case-mobile-menu[open]').count()) failures.push(`390 ${project.id}: mobile menu did not open`);
            } else {
              const toggle = page.locator('.menu-toggle');
              await toggle.click();
              if (await toggle.getAttribute('aria-expanded') !== 'true') failures.push(`390 ${project.id}: mobile menu did not open`);
            }
          }
        } catch (error) {
          failures.push(`${width} ${project.id}: ${error.message}`);
        }
      }
      await page.close();
      console.log(`${width}px: ${projects.length} cases checked`);
    }
  } finally {
    await browser.close();
    server.close();
  }
  if (failures.length) throw new Error(failures.join('\n'));
  console.log(`PASS: ${projects.length} public cases, 3 viewport widths`);
})().catch(error => { console.error(error); process.exitCode = 1; });
