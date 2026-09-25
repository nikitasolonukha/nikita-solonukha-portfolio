/* One motion controller for the static portfolio. Product videos keep their native controls. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const phoneViewport = matchMedia('(max-width: 760px)');
  if (phoneViewport.matches) {
    sessionStorage.removeItem('portfolio-transition');
    document.querySelectorAll('.page-transition').forEach(el => el.remove());
  }
  const desktop = () => fine.matches && !reduce.matches;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const cleanup = [];
  let lenis;
  let velocity = 0;

  if (!phoneViewport.matches && !reduce.matches && window.Lenis) {
    lenis = new Lenis({ smoothWheel: true, lerp: .105, wheelMultiplier: .9, touchMultiplier: 1, autoRaf: false });
    lenis.on('scroll', e => { velocity = e.velocity || 0; ScrollTrigger.update(); });
    const tick = time => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    cleanup.push(() => { gsap.ticker.remove(tick); lenis.destroy(); });
  } else {
    let lastY = scrollY, lastTime = performance.now();
    const onScroll = () => { const now = performance.now(); velocity = (scrollY - lastY) / Math.max(16, now - lastTime) * 16; lastY = scrollY; lastTime = now; };
    addEventListener('scroll', onScroll, { passive: true });
    cleanup.push(() => removeEventListener('scroll', onScroll));
  }

  const hero = $('.hero');
  if (hero && !reduce.matches && !phoneViewport.matches) {
    const portrait = $('.hero-portrait', hero);
    const meta = $$('.hero-meta span', hero);
    const marquee = $('.hero-marquee', hero);
    const unit = $('.hero-marquee-unit', hero);
    const nav = $$('.site-header .brand,.site-header .nav a,.site-header .menu-toggle');
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(portrait, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: .75 }, .1)
      .fromTo(meta, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .45, stagger: .07 }, .25)
      .fromTo(marquee, { opacity: 0, yPercent: 110 }, { opacity: 1, yPercent: 0, duration: .65 }, .35)
      .fromTo(nav, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: .38, stagger: .035 }, .55);
    if (!fine.matches) gsap.fromTo('.hero-mobile-name span', { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .7, stagger: .07, ease: 'power3.out', delay: .35 });
    let offset = 0, impulse = 0, direction = -1;
    const marqueeTick = (_, delta) => {
      if (!unit || !unit.offsetWidth || document.hidden) return;
      const target = Math.min(55, Math.abs(velocity) * 4.5);
      impulse += (target - impulse) * .065;
      if (Math.abs(velocity) > 1) direction += ((velocity > 0 ? -1 : 1) - direction) * .07;
      else direction += (-1 - direction) * .012;
      offset += direction * (50 + impulse) * Math.min(delta / 1000, .05);
      const width = unit.offsetWidth;
      offset = ((offset % width) + width) % width - width;
      gsap.set(marquee, { x: offset });
    };
    gsap.ticker.add(marqueeTick);
    cleanup.push(() => gsap.ticker.remove(marqueeTick));
    const st = ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom top', scrub: .6,
      animation: gsap.timeline().to(portrait, { y: '8vh', scale: 1.025, ease: 'none' }, 0).to($('.hero-namefield'), { y: '-4vh', ease: 'none' }, 0) });
    cleanup.push(() => st.kill());
  }

  function reveal() {
    if (reduce.matches) return;
    const text = $$('.intro-statement h2,.selected-heading .eyebrow,.selected-heading h2,.page-intro .eyebrow,.page-intro h1,.about-page h1,.case-title .eyebrow,.case-title h1,.case-story h2,.contact-section .eyebrow,.contact-section h2,.contact-page h1,.case-next>a:first-child,.pa .pa-hero h1,.pa .pa-hero .pa-lead,.pa section h2');
    if (phoneViewport.matches) {
      const mobileTargets = [...text, ...$$('.featured-image,.featured,.project-row,.about-services>div,.case-title-meta>div')];
      [...mobileTargets, ...$$('.case-cover,.case-screen-grid figure,.case-video-section figure,.case-feature figure')].forEach(el => {
        gsap.set(el, { clearProps: 'opacity,transform,clipPath' });
        const img = $('img', el);
        if (img) gsap.set(img, { clearProps: 'transform' });
      });
      // Content is visible before this observer runs; motion only begins after entry.
      // Native touch scrolling and the phone page-transition fallback remain unchanged.
      document.documentElement.classList.add('phone-motion-ready');
      if (!('IntersectionObserver' in window)) return;
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          gsap.fromTo(entry.target, { y: 14, opacity: .88 }, {
            y: 0, opacity: 1, duration: .46, ease: 'power3.out',
            clearProps: 'transform,opacity', overwrite: true,
          });
        });
      }, { rootMargin: '0px 0px -4% 0px', threshold: .05 });
      mobileTargets.forEach(el => {
        if (el.dataset.phoneMotionReady) return;
        el.dataset.phoneMotionReady = 'true';
        observer.observe(el);
      });
      cleanup.push(() => observer.disconnect());
      return;
    }
    text.forEach(el => {
      if (el.dataset.motionReady) return;
      el.dataset.motionReady = 'true';
      gsap.fromTo(el, { y: 32, opacity: 0, clipPath: 'inset(0 0 25% 0)' }, { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: .7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    $$('.featured-image,.case-cover,.case-screen-grid figure,.case-video-section figure,.case-feature figure').forEach(el => {
      if (el.dataset.motionReady) return;
      el.dataset.motionReady = 'true';
      gsap.fromTo(el, { opacity: .7, clipPath: 'inset(9% 0 9% 0)' }, { opacity: 1, clipPath: 'inset(0% 0 0% 0)', duration: .75, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      const img = $('img', el);
      if (img) gsap.fromTo(img, { scale: 1.05 }, { scale: 1, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });
    $$('.featured,.project-row,.about-services>div,.case-title-meta>div').forEach((el, index) => {
      if (el.dataset.motionReady) return;
      el.dataset.motionReady = 'true';
      gsap.fromTo(el, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .48, delay: (index % 3) * .055, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 96%', once: true } });
    });
    ScrollTrigger.refresh();
  }

  function workPreview() {
    const rows = $$('.work-rows .project-row');
    if (!desktop() || !rows.length) return;
    const preview = document.createElement('div');
    preview.className = 'work-preview';
    preview.innerHTML = '<img alt="">';
    const img = $('img', preview);
    img.src = $('.row-preview', rows[0])?.src || '';
    document.body.append(preview);
    let targetX = innerWidth * .5, targetY = innerHeight * .5, x = targetX, y = targetY, rotation = 0, active = false;
    const move = event => { targetX = Math.min(innerWidth - 180, Math.max(180, event.clientX + 90)); targetY = Math.min(innerHeight - 160, Math.max(160, event.clientY - 35)); };
    rows.forEach(row => {
      row.addEventListener('pointerenter', e => { img.src = $('.row-preview', row)?.src || ''; active = true; preview.classList.add('is-visible'); move(e); });
      row.addEventListener('pointermove', move);
      row.addEventListener('pointerleave', e => { if (!e.relatedTarget?.closest?.('.work-rows .project-row')) { active = false; preview.classList.remove('is-visible'); } });
    });
    const tick = () => {
      const previousX = x;
      x += (targetX - x) * .14; y += (targetY - y) * .14;
      rotation += ((active ? Math.max(-2, Math.min(2, (x - previousX) * .38)) : 0) - rotation) * .16;
      gsap.set(preview, { x, y, xPercent: -50, yPercent: -50, rotation });
    };
    gsap.ticker.add(tick);
    cleanup.push(() => { gsap.ticker.remove(tick); preview.remove(); });
  }

  function cursor() {
    if (!desktop()) return;
    const el = document.createElement('div'); el.className = 'motion-cursor'; el.setAttribute('aria-hidden', 'true'); document.body.append(el);
    let x = 0, y = 0, tx = 0, ty = 0;
    const move = e => {
      tx = e.clientX; ty = e.clientY; el.classList.add('is-active');
      const target = e.target.closest('a,button,video,.project-row');
      const kind = target?.closest('.project-row') ? 'work' : target?.matches('video') ? 'video' : target?.matches('a[target="_blank"]') ? 'external' : '';
      el.dataset.kind = kind;
      el.innerHTML = kind === 'work' ? 'View' : kind === 'video' ? 'Play' : kind === 'external' ? '<svg class="inline-arrow" aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M8 5h11v11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '';
      el.classList.toggle('has-label', !!kind);
    };
    document.addEventListener('pointermove', move, { passive: true });
    const tick = () => { x += (tx - x) * .28; y += (ty - y) * .28; gsap.set(el, { x, y, xPercent: -50, yPercent: -50 }); };
    gsap.ticker.add(tick);
    cleanup.push(() => { document.removeEventListener('pointermove', move); gsap.ticker.remove(tick); el.remove(); });
  }

  function magnetic() {
    if (!desktop()) return;
    $$('.contact-circle,.round-link,.case-next>a:first-child').forEach(el => {
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * .12, y: (e.clientY - r.top - r.height / 2) * .12, duration: .25, overwrite: true }); });
      el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: .48, ease: 'power3.out', overwrite: true }));
    });
  }

  function transitions() {
    if (reduce.matches || phoneViewport.matches) {
      sessionStorage.removeItem('portfolio-transition');
      $$('.page-transition').forEach(el => el.remove());
      return;
    }
    const layer = document.createElement('div'); layer.className = 'page-transition'; document.body.append(layer);
    // The layer has no CSS transform: a CSS translate and GSAP yPercent add up,
    // leaving the arriving page covered even after the entrance tween finishes.
    layer.style.transform = 'none';
    gsap.set(layer, { yPercent: 101 });
    if (sessionStorage.getItem('portfolio-transition') === '1') {
      sessionStorage.removeItem('portfolio-transition');
      const incoming = gsap.fromTo(layer, { yPercent: 0 }, { yPercent: -101, duration: .42, ease: 'power3.inOut', onComplete: () => gsap.set(layer, { yPercent: 101 }) });
      setTimeout(() => { if (incoming.isActive()) { incoming.kill(); gsap.set(layer, { yPercent: 101 }); } }, 1000);
    }
    document.addEventListener('click', e => {
      const link = e.target.closest('a[href]'); if (!link || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target || link.hasAttribute('download')) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname && url.search === location.search) return;
      e.preventDefault();
      sessionStorage.setItem('portfolio-transition', '1');
      gsap.fromTo(layer, { yPercent: 101 }, { yPercent: 0, duration: .3, ease: 'power3.inOut', onComplete: () => location.assign(url.href) });
    });
  }

  function menu() {
    const toggle = $('.menu-toggle'); const menu = $('#mobile-nav'); if (!toggle || !menu) return;
    toggle.addEventListener('click', () => { if (lenis) menu.hidden ? lenis.start() : lenis.stop(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) toggle.click(); });
  }

  transitions(); menu(); cursor(); reveal();
  document.addEventListener('portfolio:rendered', () => { reveal(); workPreview(); magnetic(); });
  addEventListener('pageshow', event => {
    sessionStorage.removeItem('portfolio-transition');
    if (phoneViewport.matches) {
      $$('.page-transition').forEach(el => el.remove());
      reveal();
    } else if (event.persisted) {
      const layer = $('.page-transition');
      if (layer) gsap.set(layer, { yPercent: 101 });
    }
    if (event.persisted) requestAnimationFrame(() => ScrollTrigger.refresh(true));
  });
  addEventListener('pagehide', event => {
    if (event.persisted) return;
    cleanup.forEach(fn => fn());
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
})();
