const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const root = path.resolve(__dirname, '..');
  const out = path.join(root, 'projects/legal-automation/assets');
  const browser = await chromium.launch({headless:true, args:['--no-sandbox']});
  const issues=[];
  const poster = await browser.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:1});
  await poster.goto('http://127.0.0.1:4315/projects/legal-automation/assets/ai-sales-cover.svg');
  await poster.locator('svg').screenshot({path:path.join(out,'ai-sales-cover.png')});
  await poster.close();
  for (const [name,width,height] of [['desktop',1440,900],['mobile',390,844]]) {
    const context = await browser.newContext({viewport:{width,height},deviceScaleFactor:1,recordVideo:{dir:out,size:{width,height}},reducedMotion:'no-preference'});
    const page = await context.newPage();
    page.on('pageerror',e=>issues.push(`${name}: ${e.message}`));
    page.on('response',r=>{if(r.url().includes('/projects/legal-automation/')&&r.status()>=400)issues.push(`${name}: ${r.status()} ${r.url()}`)});
    await page.goto('http://127.0.0.1:4315/site/case-legal-automation.html',{waitUntil:'networkidle'});
    const metrics=await page.evaluate(()=>({h1:document.querySelectorAll('h1').length,h2:document.querySelectorAll('h2').length,scrollWidth:document.documentElement.scrollWidth,innerWidth:innerWidth,sections:document.querySelectorAll('.sales-section').length}));
    if(metrics.scrollWidth>metrics.innerWidth+1)issues.push(`${name}: horizontal overflow ${metrics.scrollWidth}-${metrics.innerWidth}`);
    if(metrics.h1!==1||metrics.sections<8)issues.push(`${name}: unexpected structure ${JSON.stringify(metrics)}`);
    const maxScroll=await page.evaluate(()=>document.documentElement.scrollHeight-innerHeight);
    const step=name==='desktop'?Math.round(height*.62):Math.round(height*.53);
    for (let top=0; top<=maxScroll+step; top+=step) {
      await page.evaluate(y=>window.scrollTo({top:y,behavior:'smooth'}),Math.min(top,maxScroll));
      await page.waitForTimeout(name==='desktop'?1100:1000);
    }
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await page.waitForTimeout(800);
    const video = page.video();
    await context.close();
    fs.renameSync(await video.path(),path.join(out,`ai-sales-${name}-walkthrough.webm`));
    const still = await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});
    await still.goto('http://127.0.0.1:4315/site/case-legal-automation.html',{waitUntil:'networkidle'});
    await still.screenshot({path:path.join(out,`ai-sales-${name}-full.png`),fullPage:true,animations:'disabled'});
    await still.close();
    console.log(name,metrics);
  }
  const shell = await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  shell.on('pageerror',e=>issues.push(`shell: ${e.message}`));
  for (const [route,selector,file] of [
    ['','article.featured:has(a[href="case-legal-automation.html"])','ai-sales-home-entry.png'],
    ['work.html','a.project-row[href="case-legal-automation.html"]','ai-sales-work-entry.png']
  ]) {
    await shell.goto(`http://127.0.0.1:4315/site/${route}`,{waitUntil:'networkidle'});
    const entry=shell.locator(selector);
    if(await entry.count()!==1) issues.push(`${route||'home'}: AI Sales entry missing or duplicated`);
    else await entry.screenshot({path:path.join(out,file)});
  }
  await shell.close();
  const menuPage = await browser.newPage({viewport:{width:390,height:844}});
  await menuPage.goto('http://127.0.0.1:4315/site/case-legal-automation.html',{waitUntil:'networkidle'});
  await menuPage.locator('.menu-toggle').click();
  if(!await menuPage.locator('#mobile-nav').isVisible()) issues.push('mobile menu did not open');
  await menuPage.close();
  await browser.close();
  console.log('issues',issues);
  if(issues.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
