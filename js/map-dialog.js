/* Keep map dialogs usable inside the Fields iframe as well as standalone. */
(function(){
  'use strict';
  const frame=document.getElementById('khungBanDo');
  const topic='htx-map-dialog';
  if(frame){
    const host=frame.closest('.map-box');
    host.classList.add('map-dialog-host');
    let open=false,saved=null;
    function viewport(){
      if(open)frame.contentWindow.postMessage({type:topic+'-viewport',height:window.visualViewport?.height||innerHeight,top:window.visualViewport?.offsetTop||0},location.origin);
    }
    function setOpen(value){
      if(open===value)return;
      open=value;
      if(open){
        saved={height:host.style.height,root:document.documentElement.style.overflow,body:document.body.style.overflow};
        host.style.height=host.getBoundingClientRect().height+'px';
        document.documentElement.style.overflow='hidden';document.body.style.overflow='hidden';
        host.classList.add('map-dialog-open');
        viewport();
      }else{
        host.classList.remove('map-dialog-open');
        host.style.height=saved.height;
        document.documentElement.style.overflow=saved.root;document.body.style.overflow=saved.body;
      }
    }
    window.addEventListener('message',event=>{
      if(event.origin!==location.origin||event.source!==frame.contentWindow)return;
      if(event.data?.type===topic&&typeof event.data.open==='boolean')setOpen(event.data.open);
    });
    frame.addEventListener('load',()=>setOpen(false));
    window.addEventListener('resize',viewport,{passive:true});
    window.visualViewport?.addEventListener('resize',viewport,{passive:true});
    window.visualViewport?.addEventListener('scroll',viewport,{passive:true});
    return;
  }
  if(!document.getElementById('mpDongHanh'))return;
  let current=null,previousFocus=null,rootOverflow='',bodyOverflow='';
  function viewport(){
    document.documentElement.style.setProperty('--dialog-viewport',(window.visualViewport?.height||innerHeight)+'px');
    document.documentElement.style.setProperty('--dialog-top',(window.visualViewport?.offsetTop||0)+'px');
  }
  function sync(){
    const dialogs=Array.from(document.querySelectorAll('.modal-phu.mo'));
    const next=dialogs[dialogs.length-1]||null;
    if(next===current)return;
    if(next&&!current){
      previousFocus=document.activeElement;
      rootOverflow=document.documentElement.style.overflow;bodyOverflow=document.body.style.overflow;
      document.documentElement.style.overflow='hidden';document.body.style.overflow='hidden';
    }
    current=next;
    if(next){
      next.setAttribute('role','dialog');next.setAttribute('aria-modal','true');
      const panel=next.querySelector('.modal');panel.setAttribute('tabindex','-1');
      // Focus the panel rather than an input: opening a plot must not summon a keyboard.
      panel.focus({preventScroll:true});
    }else{
      document.documentElement.style.overflow=rootOverflow;document.body.style.overflow=bodyOverflow;
      previousFocus?.focus({preventScroll:true});
    }
    if(parent!==window)parent.postMessage({type:topic,open:!!next},location.origin);
  }
  const observer=new MutationObserver(sync);
  document.querySelectorAll('.modal-phu').forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['class']}));
  document.addEventListener('keydown',event=>{
    if(!current)return;
    if(event.key==='Escape'){event.preventDefault();current.classList.remove('mo');return;}
    if(event.key!=='Tab')return;
    const items=Array.from(current.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]')).filter(el=>el.getClientRects().length);
    if(!items.length){event.preventDefault();return;}
    const at=items.indexOf(document.activeElement);
    if(event.shiftKey&&at<=0){event.preventDefault();items[items.length-1].focus();}
    else if(!event.shiftKey&&(at<0||at===items.length-1)){event.preventDefault();items[0].focus();}
  });
  window.addEventListener('message',event=>{
    if(event.source!==parent||event.origin!==location.origin||event.data?.type!==topic+'-viewport')return;
    const {height,top}=event.data;
    if(Number.isFinite(height)&&height>0&&Number.isFinite(top)&&top>=0){
      document.documentElement.style.setProperty('--dialog-viewport',height+'px');
      document.documentElement.style.setProperty('--dialog-top',top+'px');
    }
  });
  viewport();sync();
  window.addEventListener('resize',viewport,{passive:true});
  window.visualViewport?.addEventListener('resize',viewport,{passive:true});
})();
