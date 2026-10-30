'use strict';
(function(root){
const W=typeof module!=='undefined'?require('./weather'):root.GravelWeather,R=typeof module!=='undefined'?require('./route'):root.GravelRoute;
function defaults(state,now=Date.now()){if(state.tripPlan)return {...state.tripPlan};const w=state.weather,minutes=w.rideMinutes??[45,90,180][w.duration];return {mode:w.planning?.mode||'now',startLocal:w.planning?.mode==='planned'?W.localInput(w.planning.startAt):W.localInput(now+3600000),minutes,kind:'single',returnMinutes:Math.min(360,Math.max(30,Math.round(minutes/30)*30)),stayMinutes:60};}
function windowFor(d,route,now=Date.now()){return route?R.tripFor(d,now):W.windowFor({mode:d.mode,startLocal:d.startLocal,minutes:d.minutes},now);}
function matches(f,d,route){if(!f||f.mode!==d.mode||d.mode==='planned'&&W.localInput(f.startAt)!==String(d.startLocal).replace(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}):00(?:\.0{1,3})?$/,'$1'))return false;if(route){return f.route?.id===route.id&&f.route.kind===d.kind&&f.route.outboundMinutes===d.minutes&&f.route.returnMinutes===(d.kind==='outback'?d.returnMinutes:0)&&f.route.stayMinutes===(d.kind==='outback'?d.stayMinutes:0);}return !f.route&&f.minutes===d.minutes;}
function locationLabel(f){const l=f?.location;if(!l)return 'Standort dieser älteren Prognose nicht gespeichert. Bitte Wetter neu laden.';const lat=Math.abs(l.latitude).toFixed(2)+'° '+(l.latitude<0?'S':'N'),lon=Math.abs(l.longitude).toFixed(2)+'° '+(l.longitude<0?'W':'E');return (l.kind==='route'?'GPX-Strecke '+l.label+' · Start: ':'Gerätestandort beim Abruf: ')+lat+', '+lon+' (gerundet)';}
const api={defaults,windowFor,matches,locationLabel};root.GravelPlanning=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
