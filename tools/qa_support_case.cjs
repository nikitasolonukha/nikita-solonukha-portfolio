const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const path=require('path');

(async()=>{
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const out=path.resolve(__dirname,'../projects/support-rag/assets');
  const issues=[];
  for(const [label,width,height] of [['1440',1440,900],['390',390,844]]){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});
    page.on('pageerror',e=>issues.push(`${label}: ${e.message}`));
    await page.goto('http://127.0.0.1:4315/site/case-support-rag.html',{waitUntil:'networkidle'});
    await page.locator('.support-case img').evaluateAll(async images=>{
      await Promise.all(images.map(async image=>{
        image.loading='eager';
        try{await image.decode()}catch{}
      }));
    });
    const result=await page.evaluate(()=>({
      h1:document.querySelectorAll('h1').length,
      scrollWidth:document.documentElement.scrollWidth,
      width:innerWidth,
      images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),
      realTelegram:!!document.querySelector('.support-real-screen img'),
      video:!!document.querySelector('.support-master video source[src$="master-combined-v3.mp4"]'),
      next:!!document.querySelector('.support-next a[href="case-telegram-leads.html"]')
    }));
    if(result.h1!==1||result.scrollWidth>width||result.images.length||!result.realTelegram||!result.video||!result.next)issues.push(`${label}: ${JSON.stringify(result)}`);
    await page.screenshot({path:path.join(out,`case-${label}.png`),fullPage:true,animations:'disabled'});
    if(label==='390'){
      await page.locator('.menu-toggle').click();
      if(!await page.locator('#mobile-nav').isVisible())issues.push('mobile menu failed');
    }
    console.log(label,result);
    await page.close();
  }
  const work=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  await work.goto('http://127.0.0.1:4315/site/work.html',{waitUntil:'networkidle'});
  if(await work.locator('a.project-row[href="case-support-rag.html"]').count()!==1)issues.push('Work entry missing');
  await work.close();
  await browser.close();
  console.log('issues',issues);
  if(issues.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
