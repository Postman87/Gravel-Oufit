const G=require('../core'),a=require('node:assert/strict'),{test}=require('node:test');
test('Lupra: vollständige Temperatur-/Wind-/Regen-/Intensitätsmatrix und Bestandseigenschaften',()=>{
let count=0;const results=[];
function setup(start,end,wind,rain,effort){const s=G.seed();G.importExcelItems(s);s.weather={...s.weather,startTemp:start,endTemp:end,wind,rain,effort};return s;}
for(let temp=-10;temp<=40;temp++)for(let wind=0;wind<=2;wind++)for(let rain=0;rain<=2;rain++)for(let effort=0;effort<=2;effort++){
 const s=setup(temp,temp,wind,rain,effort),r=G.recommend(s),selected=r.rows.some(x=>x.item.excelKey==='lupra-pants');
 a.equal(selected,temp<=10||wind===2||rain>0,JSON.stringify({temp,wind,rain,effort}));a.equal(new Set(r.rows.map(x=>x.item.id)).size,r.rows.length);results.push({temp,wind,rain,effort,lupra:selected});count++;
}
for(const [start,end] of [[25,3],[25,7],[11,7],[7,11]])for(let wind=0;wind<=2;wind++)for(let rain=0;rain<=2;rain++)for(let effort=0;effort<=2;effort++){
 const s=setup(start,end,wind,rain,effort),r=G.recommend(s),wear=r.rows.filter(x=>x.group==='start').map(x=>x.item),endItems=r.endItems;
 if(start<=10||wind===2||rain>0)a(wear.some(x=>x.excelKey==='lupra-pants'));if(end<=10||wind===2||rain>0)a(endItems.some(x=>x.excelKey==='lupra-pants'));if(start>=19&&wind<2&&rain===0)a(!wear.some(x=>x.excelKey==='lupra-pants'));a.equal(new Set(r.rows.map(x=>x.item.id)).size,r.rows.length);count++;
}
for(const [rrWind,lupraWind] of [[false,true],[true,true],[false,false]])for(const temp of [3,7,10,13]){const s=setup(temp,temp,0,0,1);s.items.find(i=>i.excelKey==='rr').wind=rrWind;s.items.find(i=>i.excelKey==='lupra-pants').wind=lupraWind;const included=G.recommend(s).rows.some(x=>x.item.excelKey==='lupra-pants');if(rrWind)a.equal(included,false);else if(lupraWind)a.equal(included,temp<=10);else a.equal(included,temp===3);count++;}
a.equal(count,1497);
});
