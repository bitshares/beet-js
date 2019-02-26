import Dexie from 'dexie';
const BeetClientDB = new Dexie('BeetClientDB');

BeetClientDB.version(1).stores({
    apps: `++id,&identityhash,apphash,account_id,chain,appName,secret,next_id`
}); 
BeetClientDB.open();

export default BeetClientDB;