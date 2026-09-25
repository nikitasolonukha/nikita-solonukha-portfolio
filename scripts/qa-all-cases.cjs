const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const output = process.env.QA_OUTPUT || path.resolve(root, '../qa-output/cases');
const base = (process.env.QA_BASE || 'http://127.0.0.1:4392/').replace(/\/+$/, '/') ;
const screenshots = process.env.QA_SCREENSHOTS !== '0';
const playVideos = process.env.QA_VIDEO === '1';
const widths = process.env.QA_WIDTHS
  ? process.env.QA_WIDTHS.split(',').map(spec => spec.split('x').map(Number))
  : [[1440, 900], [768, 1024], [390, 844]];
const allCases = fs.readFileSync(path.join(root, 'CASE_FULL_QA.md'), 'utf8').split(/\r?\n/)
  .filter(line => /^\|[^-|]/.test(line) && !line.startsWith('| Project'))
  .map(line => { const columns = line.split('|').slice(1).map(x => x.trim()); return { project: columns[0], route: columns[1] }; });
if (allCases.length !== 36) throw new Error(`Expected 36 cases, found ${allCases.length}`);
const cases = process.env.QA_CASES
  ? allCases.filter(item => process.env.QA_CASES.split(',').some(fragment => item.route.includes(fragment)))
  : allCases;
if (!cases.length || widths.some(pair => pair.length !== 2 || pair.some(n => !Number.isFinite(n)))) throw new Error('Invalid QA_CASES or QA_WIDTHS');
fs.mkdirSync(output, { recursive: true });

const inspect = () => {
  const visible = e => { const s = getComputedStyle(e), r = e.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0; };
  const vw = innerWidth;
  const images = [...document.images].filter(visible);
  const imageProblems = images.filter(e => e.complete && e.naturalWidth === 0).map(e => e.currentSrc);
  const upscale = images.filter(e => e.naturalWidth > 0 && e.getBoundingClientRect().width > e.naturalWidth * 1.3)
    .map(e => ({ src: e.currentSrc, natural: e.naturalWidth, rendered: Math.round(e.getBoundingClientRect().width) }));
  const uiCrop = images.filter(e => {
    const s = getComputedStyle(e), r = e.getBoundingClientRect();
    return s.objectFit === 'cover' && e.naturalWidth && e.naturalHeight &&
      Math.abs(r.width / r.height - e.naturalWidth / e.naturalHeight) > .15 &&
      !e.closest('.hero,.hero-image,.featured-image,.photography,.poster');
  }).map(e => ({ src: e.currentSrc, className: e.className, width: Math.round(e.getBoundingClientRect().width) }));
  const overflow = [...document.querySelectorAll('main h1,main h2,main h3,main p,main img,main video,main figure,footer a')]
    .filter(visible).filter(e => { const r = e.getBoundingClientRect(); return r.left < -2 || r.right > vw + 2; })
    .slice(0, 20).map(e => ({ tag: e.tagName, className: String(e.className).slice(0, 70), text: e.textContent?.trim().slice(0, 40), left: Math.round(e.getBoundingClientRect().left), right: Math.round(e.getBoundingClientRect().right) }));
  const header = [...document.querySelectorAll('.site-header,.portfolio-header,.case-header')].filter(visible);
  const footer = [...document.querySelectorAll('footer.site-footer,footer.portfolio-footer,footer.case-footer')].filter(visible);
  const next = [...document.querySelectorAll('[class*="next"] a[href],.portfolio-chain-link')]
    .find(e => {
      const name = e.getAttribute('href').split('/').pop().split('?')[0];
      return name.endsWith('.html') && !['work.html', 'contact.html', 'archive.html', 'about.html'].includes(name);
    });
  const allWork = [...document.querySelectorAll('a[href]')].find(e => /Все работы/i.test(e.textContent) && /work\.html/.test(e.getAttribute('href')));
  const contact = [...document.querySelectorAll('a[href]')].find(e => /Связаться/i.test(e.textContent) && /contact\.html/.test(e.getAttribute('href')));
  const videos = [...document.querySelectorAll('video')].filter(visible).map(e => ({ src: e.currentSrc || e.querySelector('source')?.src || '', poster: e.poster, controls: e.controls, autoplay: e.autoplay, rect: { width: Math.round(e.getBoundingClientRect().width), height: Math.round(e.getBoundingClientRect().height) } }));
  const main = document.querySelector('main');
  return { title: document.title, documentWidth: document.documentElement.scrollWidth, viewportWidth: vw, pageHeight: document.documentElement.scrollHeight, headerCount: header.length, footerCount: footer.length, next: next?.href || null, allWork: allWork?.href || null, contact: contact?.href || null, mainHeight: main?.getBoundingClientRect().height || 0, imageProblems, upscale, uiCrop, overflow, videos };
};

(async () => {
  const browser = await chromium.launch();
  const results = [];
  try {
    for (const [width, height] of widths) {
      const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      const page = await context.newPage();
      for (const item of cases) {
        const errors = [];
        const badResponses = [];
        const onError = error => errors.push(error.message);
        const onResponse = response => { if (response.status() >= 400 && new URL(response.url()).origin === new URL(base).origin) badResponses.push({ status: response.status(), url: response.url() }); };
        page.on('pageerror', onError);
        page.on('response', onResponse);
        let status = 0, failure = null, metrics = null, playback = [];
        try {
          const response = await page.goto(new URL(item.route, base).href, { waitUntil: 'domcontentloaded', timeout: 30000 });
          status = response?.status() || 0;
          await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
          await page.evaluate(() => document.fonts.ready);
          if (await page.locator('#case-root').count()) await page.waitForFunction(() => document.querySelector('#case-root')?.children.length > 0, { timeout: 7000 }).catch(() => {});
          // Walk the whole page so lazy images and scroll-triggered content are included.
          let y = 0;
          let bottom = await page.evaluate(() => document.documentElement.scrollHeight);
          while (y < bottom && y < 60000) {
            await page.evaluate(position => scrollTo(0, position), y);
            await page.waitForTimeout(70);
            y += Math.round(height * .78);
            bottom = await page.evaluate(() => document.documentElement.scrollHeight);
          }
          await page.evaluate(() => scrollTo(0, 0));
          await page.waitForTimeout(200);
          metrics = await page.evaluate(inspect);
          if (playVideos) {
            playback = await page.locator('video').evaluateAll(async elements => {
              const results = [];
              for (const e of elements) {
                if (getComputedStyle(e).display === 'none' || !e.getBoundingClientRect().width) continue;
                const previousMuted = e.muted;
                e.muted = true;
                let error = null;
                try {
                  await Promise.race([e.play(), new Promise((_, reject) => setTimeout(() => reject(new Error('play timeout')), 5000))]);
                  await new Promise(resolve => setTimeout(resolve, 350));
                } catch (cause) { error = String(cause); }
                results.push({ src: e.currentSrc || e.querySelector('source')?.src, error, time: e.currentTime, readyState: e.readyState, duration: e.duration });
                e.pause(); e.muted = previousMuted;
              }
              return results;
            });
          }
          if (screenshots) {
            const safe = item.route.replaceAll('/', '-').replace('.html', '');
            await page.screenshot({ path: path.join(output, `${safe}-${width}.png`), fullPage: true, animations: 'disabled', timeout: 30000 });
          }
        } catch (error) { failure = error.message; }
        page.off('pageerror', onError);
        page.off('response', onResponse);
        const record = { ...item, width, status, failure, metrics, playback, errors, badResponses: badResponses.slice(0, 20) };
        results.push(record);
        const summary = failure ? 'ERROR ' + failure.slice(0, 90) : `HTTP ${status}; overflow ${metrics?.overflow.length}; broken images ${metrics?.imageProblems.length}; footer ${metrics?.footerCount}; next ${!!metrics?.next}`;
        console.log(`${String(results.length).padStart(3)} ${item.route} ${width} ${summary}`);
        fs.writeFileSync(path.join(output, 'audit.json'), JSON.stringify({ base, results }, null, 2));
      }
      await context.close();
    }
  } finally { await browser.close(); }
  const failures = results.filter(r => r.failure || r.status >= 400 || !r.metrics || r.metrics.documentWidth > r.width + 2 || r.metrics.imageProblems.length || r.metrics.headerCount !== 1 || r.metrics.footerCount !== 1 || !r.metrics.next || !r.metrics.allWork || !r.metrics.contact || r.playback.some(v => v.error || v.time === 0));
  console.log(JSON.stringify({ checked: results.length, failureCount: failures.length, failures: failures.map(r => ({ route: r.route, width: r.width, failure: r.failure, overflow: r.metrics?.documentWidth - r.width, brokenImages: r.metrics?.imageProblems.length, header: r.metrics?.headerCount, footer: r.metrics?.footerCount, next: !!r.metrics?.next, allWork: !!r.metrics?.allWork, contact: !!r.metrics?.contact })) }, null, 2));
  if (failures.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
