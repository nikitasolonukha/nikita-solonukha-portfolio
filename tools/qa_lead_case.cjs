const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const path=require('path');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const issues=[];const out=path.resolve(__dirname,'../projects/telegram-leads/assets');
 for(const [label,width,height] of [['1440',1440,900],['768',768,1024],['390',390,844]]){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});
  page.on('pageerror',e=>issues.push(`${label}: ${e.message}`));
  await page.goto('http://127.0.0.1:4315/site/case-telegram-leads.html',{waitUntil:'networkidle'});
  await page.locator('.leads-case img').evaluateAll(async images=>{await Promise.all(images.map(async image=>{image.loading='eager';try{await image.decode()}catch{}}))});
  const result=await page.evaluate(()=>({h1:document.querySelectorAll('h1').length,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),videos:document.querySelectorAll('.leads-videos video').length,real:!!document.querySelector('.leads-real img[src$="telegram-leads-sanitized.png"]')}));
  if(result.h1!==1||result.scrollWidth>width||result.broken.length||result.videos!==2||!result.real)issues.push(`${label}: ${JSON.stringify(result)}`);
  await page.screenshot({path:path.join(out,`case-${label}.png`),fullPage:true,animations:'disabled'});
  if(label==='390'){await page.locator('.menu-toggle').click();if(!await page.locator('#mobile-nav').isVisible())issues.push('mobile menu failed')}
  console.log(label,result);await page.close();
 }
 await browser.close();console.log('issues',issues);if(issues.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
