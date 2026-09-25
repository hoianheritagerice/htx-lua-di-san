const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
class Element{
 constructor(){this.children=[];this.attrs={};this.events={};this.hidden=false;}
 replaceChildren(){this.children=[];}
 append(...els){this.children.push(...els);}
 setAttribute(k,v){this.attrs[k]=v;}
 addEventListener(k,fn){this.events[k]=fn;}
}
function setup(){
 const list=new Element(),nodes={},frames=[],scrolls=[];let layouts=0,reduced=false;
 const doc={getElementById:id=>id==='cdGoiSuKien'?list:nodes[id],createElement:()=>new Element(),querySelector:s=>({'header':{position:'sticky',getBoundingClientRect:()=>({height:72})},'.chon-bar':{position:'sticky',getBoundingClientRect:()=>({height:164})}}[s])};
 const context=vm.createContext({document:doc,requestAnimationFrame:cb=>frames.push(cb),getComputedStyle:el=>({position:el.position}),window:{scrollY:500,scrollTo:o=>scrolls.push(o),matchMedia:()=>({matches:reduced})},xepTimelineCD:()=>layouts++,iconHoatDongCD:id=>'<svg data-id="'+id+'"></svg>'});
 vm.runInContext(read('js/canh-dong-config.js'),context);
 vm.runInContext("let DONG_HIEN_TAI='CKOD',VU_HIEN_TAI='HT26';let SU_KIEN=[{id:'le-xuong-dong',ten:'Lễ Tịch điền - Xuống đồng',loai:'le'},{id:'gieo-sa',ten:'Gieo sạ',loai:'nong'},{id:'com-moi',ten:'Lễ Cúng mừng Lúa mới',loai:'le'}];",context);
 vm.runInContext(read('js/canh-dong-ui.js'),context);
 return {context,list,nodes,frames,scrolls,get layouts(){return layouts;},setReduced(v){reduced=v;},run:code=>vm.runInContext(code,context)};
}
test('Both packages show matching icons/titles; all-timeline removes the shortcut list',()=>{
 const s=setup();
 for(const key of ['gieo-mam','doi-tac']){
  s.run(`GOI_DANG_XEM='${key}';veSuKienGoiCD()`);
  assert.equal(s.list.hidden,false);assert.equal(s.list.children.length,2);
  assert.equal(s.list.children[0].children[1].textContent,'Lễ Tịch điền - Xuống đồng');
  assert.equal(s.list.children[1].children[1].textContent,'Lễ Cúng mừng Lúa mới');
  assert.equal(s.list.children[1].attrs['aria-controls'],'su-kien-com-moi');
  assert.match(s.list.children[1].children[0].innerHTML,/com-moi/);
 }
 s.run("GOI_DANG_XEM='tat-ca';veSuKienGoiCD()");assert.equal(s.list.hidden,true);assert.equal(s.list.children.length,0);
});
test('Field/season overrides and reordered events select by stable ID, not array position',()=>{
 const s=setup();s.run("GOI_DANG_XEM='gieo-mam';CAU_HINH_CANH_DONG.quyenLoiTheoVu['CTDC:HT26']={'gieo-mam':['gieo-sa']};DONG_HIEN_TAI='CTDC';SU_KIEN.reverse();veSuKienGoiCD()");
 assert.equal(s.list.children.length,1);assert.equal(s.list.children[0].attrs['aria-controls'],'su-kien-gieo-sa');
 s.run("CAU_HINH_CANH_DONG.quyenLoiTheoVu['CTDC:HT26']['gieo-mam']=[];veSuKienGoiCD()");assert.equal(s.list.hidden,true);
});
test('Shortcut scrolls to its event below sticky bars, respects reduced motion, does not open a modal',()=>{
 const s=setup();s.run("GOI_DANG_XEM='doi-tac';veSuKienGoiCD()");
 let focus;
 s.nodes['su-kien-com-moi']={getBoundingClientRect:()=>({top:1200}),querySelector:()=>({getBoundingClientRect:()=>({top:1195})}),focus:o=>focus=o};
 s.list.children[1].events.click();assert.equal(s.layouts,1);assert.equal(s.scrolls.length,0);
 s.frames.shift()();assert.equal(s.scrolls[0].top,1439);assert.equal(s.scrolls[0].behavior,'smooth');assert.equal(focus.preventScroll,true);
 s.setReduced(true);s.list.children[1].events.click();s.frames.shift()();assert.equal(s.scrolls[1].behavior,'instant');
 delete s.nodes['su-kien-com-moi'];s.list.children[1].events.click();s.frames.shift()();assert.equal(s.scrolls.length,2,'No stale target scrolling after data changes');
});
