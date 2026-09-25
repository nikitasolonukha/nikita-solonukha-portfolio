const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { webkit } = require('playwright');

const dist = path.resolve(__dirname, '../dist');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4' };
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  const relative = url.pathname === '/site/' ? '/site/index.html' : url.pathname;
  const file = path.resolve(dist, `.${relative}`);
  if (!file.startsWith(dist + path.sep)) return res.writeHead(403).end();
  fs.readFile(file, (error, body) => {
    if (error) return res.writeHead(404).end();
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }).end(body);
  });
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await webkit.launch();
  try {
    for (const device of [
      { name: 'desktop mouse', width: 1440, isMobile: false, hasTouch: false, phone: false },
      { name: 'desktop touch', width: 1440, isMobile: false, hasTouch: true, phone: false },
      { name: 'phone', width: 390, isMobile: true, hasTouch: true, phone: true },
    ]) {
      const page = await browser.newPage({ viewport: { width: device.width, height: 844 }, isMobile: device.isMobile, hasTouch: device.hasTouch });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`http://127.0.0.1:${server.address().port}/site/`, { waitUntil: 'load' });
      await page.locator('.selected-section').waitFor({ state: 'visible' });
      const state = await page.evaluate(() => {
        const probe = document.createElement('div');
        probe.className = 'featured';
        probe.style.opacity = '.25';
        probe.style.clipPath = 'inset(10%)';
        document.body.append(probe);
        const style = getComputedStyle(probe);
        const result = {
          coarse: matchMedia('(pointer: coarse)').matches,
          phone: matchMedia('(max-width: 760px)').matches,
          transition: !!document.querySelector('.page-transition'),
          lenis: document.documentElement.classList.contains('lenis'),
          opacity: style.opacity,
          clipPath: style.clipPath,
        };
        probe.remove();
        return result;
      });
      if (device.phone !== state.phone || state.transition === device.phone || state.lenis === device.phone || state.opacity !== (device.phone ? '1' : '0.25') || (device.phone ? state.clipPath !== 'none' : state.clipPath === 'none') || errors.length) {
        throw new Error(`${device.name}: ${JSON.stringify({ ...state, errors })}`);
      }
      if (device.phone) await page.evaluate(() => scrollTo(0, 600));
      else await page.mouse.wheel(0, 700);
      await page.waitForFunction(() => scrollY > 50, null, { timeout: 3000 });
      console.log(`${device.name}: ${JSON.stringify(state)}`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
  console.log('PASS: desktop scroll motion preserved; phone fallback isolated');
})().catch(error => { console.error(error); process.exitCode = 1; });
