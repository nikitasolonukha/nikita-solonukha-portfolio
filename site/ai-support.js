(() => {
  const line=document.querySelector('.support-flow-line');
  if (!line) return;
  const steps=[...line.children];
  if(matchMedia('(prefers-reduced-motion: reduce)').matches || !window.gsap || !window.ScrollTrigger){
    line.style.setProperty('--flow-progress','100%');
    steps.forEach(step=>step.classList.add('is-active'));
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.create({trigger:line,start:'top 84%',end:'bottom 36%',scrub:true,onUpdate:self=>{
    line.style.setProperty('--flow-progress',`${Math.round(self.progress*100)}%`);
    steps.forEach((step,index)=>step.classList.toggle('is-active',self.progress >= index/steps.length));
  }});
  gsap.fromTo('.support-hero h1',{y:30,opacity:0},{y:0,opacity:1,duration:.8,ease:'power3.out'});
  gsap.fromTo('.support-real-screen',{y:28,opacity:.65},{y:0,opacity:1,duration:.8,ease:'power2.out',scrollTrigger:{trigger:'.support-real-screen',start:'top 82%',once:true}});
})();
