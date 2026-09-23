(()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  const groups=[
    '.sales-timeline li','.support-flow-line li','.leads-route li','.schedule-story-grid>div',
    '.twitter-flow-list>div','.intel-flow-grid>div','.vibe-step-list>div','.pn-gigant-process li',
    '.pa-legal-chapters li','.pa-assistant-flow li','.pa-news-chapters article',
    '.pa-copilot-layers li','.pa-university-chapters article','.pa-linux-index article'
  ];
  const nodes=groups.flatMap(selector=>[...document.querySelectorAll(selector)]);
  if(!nodes.length)return;
  nodes.forEach((node,index)=>{
    node.dataset.flowItem='';
    node.style.setProperty('--flow-delay',`${Math.min(index%6,5)*60}ms`);
  });
  document.body.classList.add('presentation-motion-ready');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    entry.target.classList.add('is-seen');
    observer.unobserve(entry.target);
  }),{rootMargin:'0px 0px -6% 0px',threshold:.08});
  nodes.forEach(node=>observer.observe(node));
})();
