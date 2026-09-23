const { chromium } = require('C:/Users/Никита/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('path');
const fs = require('fs');
(async()=>{
  const browser=await chromium.launch({headless:true});
  const out=path.resolve(__dirname,'../site/qa/presentation');
  const results=[];
  for(const width of [1440,390]){
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:4315/site/work.html',{waitUntil:'networkidle'});
    await page.locator('#work-grid .project-row').first().waitFor();
    const result=await page.evaluate(()=>({rows:document.querySelectorAll('#work-grid .project-row').length,nda:!!document.querySelector('#work-grid a[href="case-internal-legal.html"]'),overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth)}));
    await page.screenshot({path:path.join(out,`work-${width}.png`),fullPage:true});
    results.push({width,...result,errors});
    await page.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(out,'shell-qa.json'),JSON.stringify(results,null,2));
  console.log(results);
  if(results.some(x=>x.rows!==14||!x.nda||x.overflow||x.errors.length))process.exitCode=1;
})();
