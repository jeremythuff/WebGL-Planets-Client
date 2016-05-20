
class StorageService {
    constructor(storageType) {
        let StorageService = this;
        StorageService._storage = typeof storageType === undefined ? storageType : sessionStorage;
        StorageService._cbs = new Map();
    };

    setValue(key, value) {

        if(typeof value == "object") {
            value = JSON.stringify(value);
        }

        if(!this._storage.getItem(key)) {
            this._cbs.get(key).forEach(function(cbs) {
                if(cbs.addCb)cbs.addCb(value);
            });
        }

        this._storage.setItem(key, value);
        
        this._cbs.get(key).forEach(function(cbs) {
            if(cbs.setCb)cbs.setCb(value);
        });

    };

    getValue(key) {

        let value = this._storage.getItem(key);
        try { value = JSON.parse(value); } catch(e) {}

        return value;
    };

    removeValue(key) {
        delete this._storage[key];
        this._cbs.get(key).forEach(function(cbs) {
            if(cbs.removeCb)cbs.removeCb();
        });
    };

    when(key, setCb, removeCb, addCb) {

        let cbs = {
            setCb: setCb,
            removeCb: removeCb,
            addCb: addCb
        }

        if(this._cbs.has(key)) {
            this._cbs.get(key).add(cbs);
        } else {
            let newCbSet = new Set();
            newCbSet.add(cbs);
            this._cbs.set(key, newCbSet);
        }

        console.log(this);

    }
}

let storageService = new StorageService();

export { storageService as StorageService};
