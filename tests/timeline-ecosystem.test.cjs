const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const context=vm.createContext({window:{addEventListener(){}},document:{addEventListener(){}},console});
for(const f of ['js/canh-dong-timeline.js','js/canh-dong-sinh-thai.js']){
  vm.runInContext(readFileSync(path.join(root,f),'utf8'),context);
}
let layouts=0;
// Cover 320px phones (276px content), the 680px layout boundary, loaded,
// failed and tall photos/labels, and package badges that change row heights.
for(const width of [276,316,331,346,370,386,500,636,679,680,681,724,820,960]){
  for(const heights of [Array(13).fill(34),Array(13).fill(270),Array.from({length:13},(_,i)=>34+(i*37)%260)]){
    const layout=context.tinhBoCucTimelineCD(width,heights);
    const boxes=context.window.HeSinhThaiCD.placements(layout);
    const obstacles=layout.points.flatMap(p=>[p.label,{x:p.x-34,y:p.y-34,width:68,height:68}]);
    boxes.forEach((box,i)=>{
      assert(box.x>=0&&box.x+box.width<=width,`Overflow x at ${width}/${i}`);
      assert(box.y>=0&&box.y+box.height<=layout.height,`Overflow y at ${width}/${i}`);
      for(const obstacle of obstacles)assert(!context.chamNhauCD(box,obstacle,2),`Content collision at ${width}/${i}`);
      boxes.slice(i+1).forEach(other=>assert(!context.chamNhauCD(box,other,0),'Scene collision'));
      // Hôm nay uses the path lane; check placements at and between all nodes.
      for(let n=0;n<layout.points.length-1;n++){
        const a=layout.points[n],b=layout.points[n+1];
        for(const t of [0,.25,.5,.75,1]){
          const u=t*t*(3-2*t);
          const today=context.viTriHomNayCD(layout,{x:a.x+(b.x-a.x)*u,y:a.y+(b.y-a.y)*t});
          if(today)assert(!context.chamNhauCD(box,today.box,0),`Today collision at ${width}/${i}`);
        }
      }
    });
    layouts++;
  }
}
console.log(`${layouts} responsive layouts: no label, photo, marker, today, scene collisions or overflow.`);
