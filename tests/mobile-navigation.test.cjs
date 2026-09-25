const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),test=require('node:test'),path=require('node:path');
const source=name=>fs.readFileSync(path.join(__dirname,'..',name),'utf8');
function element(height=100){
  const classes=new Set(),listeners={},attrs={};
  return {style:{overflow:'',height:'',setProperty(k,v){this[k]=v;}},listeners,attrs,
    classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x)},
    addEventListener(k,fn){listeners[k]=fn;},setAttribute(k,v){attrs[k]=v;},removeAttribute(k){delete attrs[k];},
    getBoundingClientRect(){return {height,top:0,bottom:height};},getClientRects(){return [{}];},
    focus(){this.focused=true;},querySelector(){return null;}};
}
test('Each package keeps exactly one heading and follows viewport/header changes',()=>{
  const header=element(73),jump=element(59),root=element(),mq={matches:true,addEventListener(k,fn){this.change=fn;}},events={};
  let position='sticky',resize;
  const sections=['gieo-mam','doi-tac'].map(id=>{
    const section=element(1000),media=element(188),copy=element(),heading=element(),h2=element();
    heading.querySelector=()=>h2;
    media.prepend=copy.prepend=function(el){el.owner=this;};
    section.querySelector=s=>({'.sp-media':media,'.sp-copy':copy,'.sp-heading':heading}[s]);
    section.id=id;return Object.assign(section,{media,copy,heading});
  });
  const links=sections.map(s=>Object.assign(element(),{hash:'#'+s.id}));jump.querySelectorAll=()=>links;
  const doc={documentElement:root,querySelector:s=>({'body>header':header,'.sp-jump':jump,'.event-sec':element(10)}[s]),querySelectorAll:()=>sections};
  vm.runInNewContext(source('js/san-pham-mobile.js'),{document:doc,matchMedia:()=>mq,getComputedStyle:()=>({position}),ResizeObserver:class{constructor(cb){resize=cb;}observe(){}},window:{addEventListener(k,fn){events[k]=fn;}},requestAnimationFrame:fn=>fn()});
  sections.forEach(s=>assert.equal(s.heading.owner,s.media));
  assert.equal(root.style['--sp-header-height'],'73px');assert.equal(root.style['--sp-jump-height'],'59px');
  sections.forEach(s=>assert.equal(s.style['--sp-summary-height'],'188px'));
  mq.matches=false;mq.change();sections.forEach(s=>assert.equal(s.heading.owner,s.copy));
  mq.matches=true;mq.change();sections.forEach(s=>assert.equal(s.heading.owner,s.media));
  position='relative';resize();assert.equal(root.style['--sp-header-height'],'0px','Landscape must not retain the desktop header offset');
});
test('Embedded map expands only for its own same-origin messages and restores layout',()=>{
  const host=element(640),frame=element(),root=element(),body=element(),events={},messages=[];
  root.style.overflow='auto';body.style.overflow='clip';host.style.height='initial';
  frame.closest=()=>host;frame.contentWindow={postMessage:(...a)=>messages.push(a)};
  const origin='https://example.test';
  vm.runInNewContext(source('js/map-dialog.js'),{document:{getElementById:()=>frame,documentElement:root,body},window:{addEventListener(k,fn){events[k]=fn;}},location:{origin},innerHeight:812});
  const send=(open,overrides={})=>events.message({origin,source:frame.contentWindow,data:{type:'htx-map-dialog',open},...overrides});
  send(true,{origin:'https://other.test'});assert(!host.classList.contains('map-dialog-open'));
  send(true,{source:{}});assert(!host.classList.contains('map-dialog-open'));
  send(true);assert(host.classList.contains('map-dialog-open'));assert.equal(host.style.height,'640px');assert.equal(body.style.overflow,'hidden');
  assert.equal(messages[0][0].height,812);send(true); // idempotent, preserves original styles
  send(false);assert.equal(host.style.height,'initial');assert.equal(root.style.overflow,'auto');assert.equal(body.style.overflow,'clip');
  send(true);frame.listeners.load();assert(!host.classList.contains('map-dialog-open'),'Navigating the iframe releases the page');
});
test('Map dialogs trap focus, close by Escape and release both page and parent',()=>{
  const root=element(),body=element(),panel=element(),first=element(),last=element(),trigger=element(),dialog=element(),events={},messages=[];
  let notify,active=[];dialog.querySelector=()=>panel;dialog.querySelectorAll=()=>[first,last];
  const doc={documentElement:root,body,activeElement:trigger,getElementById:id=>id==='mpDongHanh'?dialog:null,querySelectorAll:s=>s==='.modal-phu.mo'?active:[dialog],addEventListener(k,fn){events[k]=fn;}};
  const origin='https://example.test',win={addEventListener(){}};
  vm.runInNewContext(source('js/map-dialog.js'),{document:doc,window:win,parent:{postMessage:m=>messages.push(m)},location:{origin},innerHeight:568,MutationObserver:class{constructor(fn){notify=fn;}observe(){}}});
  active=[dialog];notify();assert(panel.focused);assert.equal(root.style.overflow,'hidden');assert.equal(messages.at(-1).open,true);
  let prevented=false;doc.activeElement=last;events.keydown({key:'Tab',preventDefault(){prevented=true;}});assert(prevented&&first.focused);
  doc.activeElement=first;events.keydown({key:'Tab',shiftKey:true,preventDefault(){}});assert(last.focused);
  dialog.classList.add('mo');events.keydown({key:'Escape',preventDefault(){}});assert(!dialog.classList.contains('mo'));
  active=[];notify();assert.equal(root.style.overflow,'');assert(trigger.focused);assert.equal(messages.at(-1).open,false);
});
test('All inline scripts compile and product markup uses one named heading per package',()=>{
  for(const file of ['san-pham.html','canh-dong.html','ban-do.html','chi-tiet.html','index.html','ve-chung-toi.html']){
    const html=source(file);
    for(const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(match[1],{filename:file});
  }
  const context={window:{},document:{getElementById(){return {innerHTML:''};}}};vm.createContext(context);
  vm.runInContext(source('js/noi-dung.js'),context);
  const html=source('san-pham.html'),script=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].find(m=>m[1].includes('function packageHtml'))[1];
  const rendered={};context.document.getElementById=id=>rendered[id]??=( {innerHTML:''});vm.runInContext(script,context);
  for(const id of ['gieoMamNoi','doiTacNoi']){
    assert.equal((rendered[id].innerHTML.match(/<h2>/g)||[]).length,1);
    assert(rendered[id].innerHTML.includes('class="sp-heading"'));
    assert(rendered[id].innerHTML.includes('class="sp-photo"'));
    assert(rendered[id].innerHTML.includes('class="sp-price"'));
  }
});
