import {openDatabase} from './database.js';
import {render} from './ui.js';
const connection=document.querySelector('#connection');
function updateConnection(){connection.textContent=navigator.onLine?'Online':'Offline';}
window.addEventListener('online',updateConnection);window.addEventListener('offline',updateConnection);updateConnection();
const tabs=document.querySelector('.tabs');tabs.addEventListener('click',event=>{const tab=event.target.closest('[data-tab]');if(tab)void navigate(tab.dataset.tab);});
async function navigate(tab){try{await render(tab);}catch(err){console.error(err);document.querySelector('#content').textContent=`Fehler beim Laden: ${err.message}`;}}
try{await openDatabase();await navigate('outfit');}catch(err){console.error(err);document.querySelector('#content').textContent=`Lokale Datenbank nicht verfügbar: ${err.message}`;}
if('serviceWorker'in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('./sw.js').catch(err=>console.warn('Offline-Installation fehlgeschlagen:',err));});}
