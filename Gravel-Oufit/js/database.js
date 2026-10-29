// IndexedDB schema v1. Future changes require explicit migrations.
export const DB_NAME='gravel-outfit';
export const DB_VERSION=1;
export const STORES=['wardrobe','care','rides','feedback','learning','settings','products','meta'];
let connection;
export function openDatabase(){
 if(connection)return connection;
 connection=new Promise((resolve,reject)=>{
  const request=indexedDB.open(DB_NAME,DB_VERSION);
  request.onupgradeneeded=()=>{const db=request.result;for(const name of STORES){if(!db.objectStoreNames.contains(name))db.createObjectStore(name,{keyPath:'id'});}};
  request.onsuccess=()=>{const db=request.result;db.onversionchange=()=>{db.close();connection=undefined;};resolve(db);};
  request.onerror=()=>{connection=undefined;reject(request.error);};
  request.onblocked=()=>{connection=undefined;reject(new Error('Datenbank durch einen anderen Tab blockiert.'));};
 });return connection;
}
export async function putRecord(store,record){if(!STORES.includes(store))throw new Error('Unbekannter Speicherbereich');const db=await openDatabase();return new Promise((resolve,reject)=>{const tx=db.transaction(store,'readwrite');tx.objectStore(store).put(record);tx.oncomplete=()=>resolve(record);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Speichern abgebrochen'));});}
export async function getRecord(store,id){if(!STORES.includes(store))throw new Error('Unbekannter Speicherbereich');const db=await openDatabase();return new Promise((resolve,reject)=>{const req=db.transaction(store).objectStore(store).get(id);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
export async function getAllRecords(store){if(!STORES.includes(store))throw new Error('Unbekannter Speicherbereich');const db=await openDatabase();return new Promise((resolve,reject)=>{const req=db.transaction(store).objectStore(store).getAll();req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
export async function deleteRecord(store,id){if(!STORES.includes(store))throw new Error('Unbekannter Speicherbereich');const db=await openDatabase();return new Promise((resolve,reject)=>{const tx=db.transaction(store,'readwrite');tx.objectStore(store).delete(id);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});}
