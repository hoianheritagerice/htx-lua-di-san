/* Move the same heading, so visual and reading order agree at each breakpoint. */
(function(){
  'use strict';
  const query=matchMedia('(max-width:900px)'), root=document.documentElement;
  const header=document.querySelector('body>header'), jump=document.querySelector('.sp-jump');
  const packages=Array.from(document.querySelectorAll('.sp-sec'));
  function measure(){
    root.style.setProperty('--sp-header-height',(getComputedStyle(header).position==='sticky'?header.getBoundingClientRect().height:0)+'px');
    root.style.setProperty('--sp-jump-height',jump.getBoundingClientRect().height+'px');
    packages.forEach(section=>section.style.setProperty('--sp-summary-height',section.querySelector('.sp-media').getBoundingClientRect().height+'px'));
  }
  function arrange(){
    packages.forEach(section=>{
      const heading=section.querySelector('.sp-heading');
      heading.querySelector('h2').setAttribute('data-hien-bo','');
      section.querySelector(query.matches?'.sp-media':'.sp-copy').prepend(heading);
    });
    measure();
  }
  arrange();query.addEventListener('change',arrange);
  const observer=new ResizeObserver(measure);
  [header,jump,...packages.map(s=>s.querySelector('.sp-media'))].forEach(el=>observer.observe(el));
  window.addEventListener('resize',measure,{passive:true});
  // Reflect the currently read package without stealing horizontal/page scroll.
  let pending=false;
  function update(){
    pending=false;
    const edge=jump.getBoundingClientRect().bottom+24;
    const current=[...packages,document.querySelector('.event-sec')].find(s=>{
      const r=s.getBoundingClientRect();return r.top<=edge&&r.bottom>edge;
    });
    jump.querySelectorAll('a').forEach(a=>{
      if(current&&a.hash==='#'+current.id)a.setAttribute('aria-current','location');
      else a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update);}},{passive:true});
  update();
})();
