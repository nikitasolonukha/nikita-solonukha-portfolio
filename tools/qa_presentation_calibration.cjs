const { chromium } = require('C:/Users/Никита/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('path');
const fs = require('fs');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'site', 'qa', 'presentation');
fs.mkdirSync(out, { recursive: true });
const pages = ['legal-automation','support-rag','telegram-leads','telegram-schedule','twitter-automation','telegram-intel','vibe-autorouter','gigant','internal-legal','personal-assistant','news-aggregator-archive','copilot','university-projects','linux-lab'];
(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  for (const width of [1440, 768, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    for (const slug of pages) {
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`http://127.0.0.1:4315/site/case-${slug}.html`, { waitUntil: 'networkidle' });
      await page.locator('h1').first().waitFor();
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
          scrollTo(0, y);
          await new Promise(resolve => setTimeout(resolve, 40));
        }
        await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
        scrollTo(0, 0);
      });
      const metrics = await page.evaluate(() => ({
        title: document.title,
        h1: [...document.querySelectorAll('h1')].map(e => e.textContent.trim()),
        overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
        images: [...document.images].filter(e => !e.complete || !e.naturalWidth).map(e => e.src),
        videos: document.querySelectorAll('video').length,
      }));
      await page.screenshot({ path: path.join(out, `${slug}-${width}.png`), fullPage: true });
      results.push({ slug, width, ...metrics, errors });
    }
    await page.close();
  }
  fs.writeFileSync(path.join(out, 'qa.json'), JSON.stringify(results, null, 2));
  await browser.close();
  if (results.some(x => x.overflow || x.images.length || (x.slug !== 'copilot' && x.videos) || x.errors.length || x.h1.length !== 1)) process.exitCode = 1;
  console.log(JSON.stringify(results.map(({slug,width,overflow,images,videos,errors}) => ({slug,width,overflow,images:images.length,videos,errors})), null, 2));
})();
