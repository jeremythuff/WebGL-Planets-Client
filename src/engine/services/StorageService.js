
class StorageService {
    constructor(storageType) {

        let StorageService = this;

        StorageService._storage = typeof storageType === undefined ? storageType : sessionStorage;

        window.addEventListener('storage', function(e) {
            console.log(e);
        });

    };

    set(key, value) {


        if(typeof value == "object") {
            value = JSON.stringify(value);
        }
        
        this._storage.setItem(key, value);
    };

    get(key) {

        let value = this._storage.getItem(key);

        try { value = JSON.parse(value); } catch(e) {}

        return value;
    }

    remove(key) {
        delete this._storage[key];
    }
}

let storageService = new StorageService();

export { storageService as StorageService};
