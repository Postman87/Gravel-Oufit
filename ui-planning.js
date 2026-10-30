'use strict';
(function(root){function nextQuarter(now=Date.now()){const d=new Date(now+3600000);d.setMinutes(Math.ceil(d.getMinutes()/15)*15,0,0);return d;}
function times(saved=''){const values=Array.from({length:96},(_,i)=>String(Math.floor(i/4)).padStart(2,'0')+':'+String(i%4*15).padStart(2,'0'));if(/^\d{2}:\d{2}$/.test(saved)&&+saved.slice(0,2)<24&&+saved.slice(3)<60&&!values.includes(saved))values.push(saved);return values;}
function combine(day,time){if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||!/^\d{2}:\d{2}$/.test(time))throw Error('Bitte Datum und Uhrzeit wählen.');return day+'T'+time;}
const api={nextQuarter,times,combine};root.GravelUIPlanning=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
