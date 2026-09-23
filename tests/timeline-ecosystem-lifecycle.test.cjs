const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
let notify,frames=new Map(),next=1,painted=[];
class Element{
 constructor(tag){this.tagName=tag;this.children=[];this.style={};this.dataset={};this.events={};this.attrs={};this.width=300;this.height=150;const set=new Set();this.classList={add:c=>set.add(c),remove:c=>set.delete(c),toggle:(c,v)=>v?set.add(c):set.delete(c)};}
 append(...nodes){this.children.push(...nodes);}
 before(node){this.caption=node;}
 setAttribute(k,v){this.attrs[k]=v;}
 addEventListener(k,v){this.events[k]=v;}
 remove(){}
 getContext(){return {setTransform(){}};}
}
const doc={hidden:false,events:{},createElement:tag=>new Element(tag),createTextNode:t=>t,addEventListener(k,v){this.events[k]=v;}};
const media={matches:false,addEventListener(k,f){this.change=f;}};
const win={IntersectionObserver:true,devicePixelRatio:2,matchMedia:()=>media,HeSinhThaiArt:{makeSprites:()=>({}),draw:(g,s,type,time)=>painted.push({type,time}),frogPose:t=>({phase:t?'jump':'rest'})}};
const context=vm.createContext({window:win,document:doc,console,Image:class{set src(v){Promise.resolve().then(()=>this.onload());}},IntersectionObserver:class{constructor(cb){notify=cb;}observe(){}unobserve(){}},requestAnimationFrame:cb=>{const id=next++;frames.set(id,cb);return id;},cancelAnimationFrame:id=>frames.delete(id)});
vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/canh-dong-sinh-thai.js'),'utf8'),context);
function flush(now){const q=[...frames.values()];frames.clear();q.forEach(cb=>cb(now));}
(async()=>{
const river=new Element('river'),layout={mobile:true,width:346,points:[{x:40,y:72,right:true,label:{x:142,y:46,width:194,height:220}}]};
win.HeSinhThaiCD.render(river,layout);const layer=river.children[0],scene=layer.children[0],control=river.caption.children[1];
assert.equal(frames.size,0,'Offscreen scene must not run');
notify([{target:scene,isIntersecting:true,intersectionRatio:.3}]);
await new Promise(setImmediate);assert.equal(frames.size,1,'Visible scene starts one loop');
flush(100);flush(116);assert(painted.some(p=>p.time>0));
control.events.click();assert.equal(frames.size,0);assert.equal(control.attrs['aria-pressed'],'true');
control.events.click();assert.equal(frames.size,1);
notify([{target:scene,isIntersecting:false,intersectionRatio:0}]);assert.equal(frames.size,0);
notify([{target:scene,isIntersecting:true,intersectionRatio:.3}]);assert.equal(painted.at(-1).time,0,'Re-entry starts with the resting pose');
doc.hidden=true;doc.events.visibilitychange();assert.equal(frames.size,0);
doc.hidden=false;doc.events.visibilitychange();assert.equal(frames.size,1);
media.matches=true;media.change();assert.equal(frames.size,0);assert.equal(painted.at(-1).time,0);
win.HeSinhThaiCD.render(river,{...layout,width:316});assert.equal(river.children.length,1);assert.equal(layer.children.length,1);
assert.equal(scene.children[0].width,600,'Canvas is capped to 2x pixel density');
console.log('Scroll entry/re-entry, offscreen pause, user pause/resume, hidden tab, reduced motion and resize passed.');
})();
