import { assetLoader } from "engine/utils/AssetLoader";

export class Entity {
    constructor() {
        this._mesh = null;
        this.assetLoader = assetLoader;
        this.loaded = false;
    }

    getMesh() {
        return this._mesh;
    }

    load() {}

    update() {}

    destroy() {}

}