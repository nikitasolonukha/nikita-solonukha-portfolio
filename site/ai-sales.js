(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stages = [...document.querySelectorAll('.sales-timeline li')];
  const timeline = document.querySelector('.sales-timeline');
  if (!timeline) return;
  if (reduced || !window.gsap || !window.ScrollTrigger) {
    stages.forEach(stage => stage.classList.add('is-active'));
    timeline.style.setProperty('--progress', '100%');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo('.signal-live', {strokeDashoffset: 1200}, {strokeDashoffset: 0, duration: 1.7, ease:'power2.out', delay:.35});
  ScrollTrigger.create({
    trigger: timeline, start:'top 85%', end:'bottom 35%', scrub:true,
    onUpdate(self) {
      timeline.style.setProperty('--progress', `${Math.round(self.progress * 100)}%`);
      stages.forEach((stage, index) => stage.classList.toggle('is-active', self.progress >= index / stages.length));
    }
  });
  document.querySelectorAll('.sales-number-scene').forEach(scene => {
    gsap.fromTo(scene.querySelector('strong'), {y:90, opacity:0}, {
      y:0, opacity:1, duration:.85, ease:'power3.out',
      scrollTrigger:{trigger:scene,start:'top 75%',once:true}
    });
  });
  gsap.fromTo('.sales-output', {y:45,opacity:.35}, {y:0,opacity:1,duration:.9,ease:'power2.out',scrollTrigger:{trigger:'.sales-demo',start:'top 70%',once:true}});
  gsap.fromTo('.sales-delivery-orbit', {y:55,opacity:.45}, {y:0,opacity:1,duration:1,ease:'power2.out',scrollTrigger:{trigger:'.sales-delivery-art',start:'top 80%',once:true}});
})();
