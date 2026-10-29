const CACHE='gravel-outfit-shell-v1';
const SHELL=['./','./index.html','./css/style.css','./js/app.js','./js/ui.js','./js/database.js','./manifest.webmanifest','./assets/icons/icon.svg','./assets/icons/icon-180.png','./assets/icons/icon-192.png','./assets/icons/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('gravel-outfit-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const request=event.request;if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));});
