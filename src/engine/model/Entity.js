import { assetLoader } from "engine/utils/assets/AssetLoader";

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

    destroy(scene) {
        let Entity = this;
        let meshId = Entity.getMesh().id;
        console.log(Entity.getMesh().id);
        let selectedObject = scene.getObjectById(meshId);
        scene.remove( selectedObject );
    }

}