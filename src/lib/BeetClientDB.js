import Dexie from 'dexie';

class BeetClientDB {
    constructor(){
        if(!BeetClientDB.instance){
            this._db = new Dexie('BeetClientDB');
            this._db.version(1).stores({
                apps: `++id,&identityhash,apphash,chain,appName,secret,next_id`
            });
            // not necessary, opens on first usage
            //this._opened = false;
            //this._opening = false;
            //this._ensure();
            BeetClientDB.instance = this;
        }
        return BeetClientDB.instance._db;
    }

    _ensure() {
        if (!this._opened && !this._opening) {
            this._opening = true;
            this._db.open().then(res => {
                this._opened = true;
                this._opening = false;
            }).catch(err => {
                console.error(err);
            })
        }
    }
}

const beetClientDB = new BeetClientDB();
export default beetClientDB;