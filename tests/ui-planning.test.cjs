const {test}=require('node:test'),a=require('node:assert/strict'),U=require('../ui-planning');
test('Uhrzeitwahl bietet alle 96 Viertelstunden vom Tagesanfang bis 23:45',()=>{const v=U.times();a.equal(v.length,96);a.equal(v[0],'00:00');a.equal(v.at(-1),'23:45');a(v.every(x=>+x.slice(3)%15===0));});
test('Frühere gespeicherte Uhrzeit wird angeboten und nicht ungefragt gerundet',()=>{const v=U.times('12:07');a.equal(v.length,97);a(v.includes('12:07'));a.equal(U.combine('2026-10-31','12:07'),'2026-10-31T12:07');});
test('Neue Planung schlägt volle Viertelstunde vor, auch über Mitternacht',()=>{const d=new Date(2026,9,30,22,58),n=U.nextQuarter(d.getTime());a.equal(n.getDate(),31);a.equal(n.getHours(),0);a.equal(n.getMinutes(),0);});
test('Datum und Uhrzeit müssen vollständig sein',()=>{a.throws(()=>U.combine('','12:00'));a.throws(()=>U.combine('2026-10-31',''));a.equal(U.combine('2026-10-31','12:15'),'2026-10-31T12:15');});
