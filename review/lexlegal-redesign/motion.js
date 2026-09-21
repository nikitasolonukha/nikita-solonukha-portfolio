(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const splash=document.querySelector('.intro-screen');
 const ease='cubic-bezier(.23,1,.32,1)';
 let keyboard=false,finished=false;
 const running=new Set();
 function appear(el,duration=600,delay=0){
  if(reduced.matches||keyboard||!el.animate)return;
  const a=el.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration,delay,easing:ease,fill:'backwards'});
  running.add(a);a.onfinish=()=>running.delete(a);a.oncancel=()=>running.delete(a);
 }
 function finish(animate=false){
  if(finished)return;finished=true;splash?.remove();
  if(animate){appear(document.querySelector('.hero-text'),700);appear(document.querySelector('.hero-photo'),800,100)}
 }
 document.addEventListener('keydown',()=>{keyboard=true;finish();running.forEach(a=>a.cancel())},true);
 document.addEventListener('pointerdown',()=>{keyboard=false;finish()},true);
 document.addEventListener('wheel',()=>finish(),{once:true,passive:true});
 if(reduced.matches||location.hash)finish();else setTimeout(()=>finish(true),1750);
 reduced.addEventListener('change',()=>{if(reduced.matches){finish();running.forEach(a=>a.cancel())}});
 window.addEventListener('pageshow',e=>{if(e.persisted)finish()});
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(!entry.isIntersecting)return;observer.unobserve(entry.target);appear(entry.target);
  }),{threshold:.08});
  document.querySelectorAll('.about-heading,.introduction>div:last-child,.section-title,.practice-list,.consultation-poster,.consultation-copy,.questions-title,.faq,.contact>div').forEach(el=>observer.observe(el));
 }
 document.querySelectorAll('details').forEach(el=>el.addEventListener('toggle',()=>{
  if(!el.open)return;const content=el.querySelector('.practice-body')||el.querySelector('p');
  if(content)appear(content,220);
 }));
})();
