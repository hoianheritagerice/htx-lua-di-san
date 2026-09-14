/* Đếm số dùng chung cho ảnh bìa và mục Tác động. Không gọi mạng. */
(function(){
  const jobs=new WeakMap();
  window.dungDemSoTrong=function(root){
    root.querySelectorAll('[data-count-value]').forEach(el=>{
      const job=jobs.get(el);if(job){job.stop=true;cancelAnimationFrame(job.frame);job.observer?.disconnect();jobs.delete(el);}
    });
  };
  window.demSoHienDan=function(el,value,options={}){
    if(!el)return;
    const old=jobs.get(el);if(old){old.stop=true;cancelAnimationFrame(old.frame);old.observer?.disconnect();}
    const decimals=options.soLe??(Number.isInteger(value)?0:1),suffix=options.hau||'';
    const format=n=>n.toLocaleString('vi-VN',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})+suffix;
    const final=format(value);el.dataset.countValue=String(value);el.setAttribute('aria-label',final);
    if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){el.textContent=final;return;}
    const job={stop:false,started:false,frame:0,observer:null};jobs.set(el,job);el.textContent=format(0);
    function start(){
      if(job.started||job.stop)return;job.started=true;
      job.observer?.disconnect();let began=null;
      function step(t){
        if(job.stop||!el.isConnected)return;
        if(began===null)began=t;
        const progress=Math.min(1,Math.max(0,(t-began)/1400));
        el.textContent=progress===1?final:format(value*(1-Math.pow(1-progress,3)));
        if(progress<1)job.frame=requestAnimationFrame(step);else jobs.delete(el);
      }
      job.frame=requestAnimationFrame(step);
    }
    if('IntersectionObserver' in window){
      job.observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))start();},{threshold:.25});
      job.observer.observe(el);
    }else start();
  };
})();
