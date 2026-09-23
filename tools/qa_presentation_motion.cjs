const {chromium}=require('C:/Users/Никита/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const results=[];
 for(const slug of ['telegram-schedule','vibe-autorouter','gigant','personal-assistant','copilot','university-projects']){
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:4315/site/case-${slug}.html`,{waitUntil:'networkidle'});
  await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,55));}});
  await page.waitForTimeout(700);
  const state=await page.evaluate(()=>({items:document.querySelectorAll('[data-flow-item]').length,seen:document.querySelectorAll('[data-flow-item].is-seen').length}));
  results.push({slug,...state,errors});
  await page.close();
 }
 await browser.close();
 console.log(results);
 if(results.some(x=>x.items<1||x.seen<1||x.errors.length))process.exitCode=1;
})();
