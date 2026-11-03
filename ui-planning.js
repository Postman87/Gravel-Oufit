'use strict';
(function(root){function nextQuarter(now=Date.now()){const d=new Date(now+3600000);d.setMinutes(Math.ceil(d.getMinutes()/30)*30,0,0);return d;}
function times(saved=''){const values=Array.from({length:48},(_,i)=>String(Math.floor(i/2)).padStart(2,'0')+':'+String(i%2*30).padStart(2,'0'));if(/^\d{2}:\d{2}$/.test(saved)&&+saved.slice(0,2)<24&&+saved.slice(3)<60&&!values.includes(saved))values.push(saved);return values;}
function combine(day,time){if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||!/^\d{2}:\d{2}$/.test(time))throw Error('Bitte Datum und Uhrzeit wählen.');return day+'T'+time;}
function returnStay(plan){if(plan.mode!=='planned'||plan.kind!=='outback'||!plan.returnStartLocal)return plan.stayMinutes;const start=new Date(plan.startLocal).getTime(),back=new Date(plan.returnStartLocal).getTime(),stay=(back-start)/60000-plan.minutes;if(!Number.isInteger(stay)||stay<0)throw Error('Die Rückfahrt muss nach der Ankunft am Wendepunkt liegen.');if(stay>1440)throw Error('Der Aufenthalt darf höchstens 24 Stunden dauern.');return stay;}
const api={nextQuarter,times,combine,returnStay};root.GravelUIPlanning=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
