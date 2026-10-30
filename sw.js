'use strict';
const CACHE='gravel-outfit-0.12.1',BASE=new URL('./',self.location.href).pathname;
const FILES=['./','./index.html','./style.css','./core.js','./weather.js','./route.js','./planning.js','./excel-rules.js','./data/excel-source.json','./app.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('gravel-outfit-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(BASE)||u.pathname.endsWith('/version.json'))return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match(new URL('./index.html',self.location.href))));return;}e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));});
