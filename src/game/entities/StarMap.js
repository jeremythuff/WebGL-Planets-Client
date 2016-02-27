import { AssetLoader } from "./../../engine/utils/AssetLoader.js"
import { Texture } from "./../../engine/model/Texture.js"

let assetLoader = new AssetLoader();

export class StarMap {
	constructor() {
		let StarMap = this;
		StarMap.loaded = false;
		StarMap.mesh = null;
	}

	load() {

		let StarMap = this;

		let loadPromise = assetLoader.loadAll([
			new Texture("src/game/resources/textures/spiral-galaxy.png")
		]).then(function(resources) {

			let planeGeometry = new THREE.PlaneGeometry(180, 120, 1, 1);
			let material  = new THREE.MeshPhongMaterial({
				transparent: true, 
				opacity: 0.5,
				map: resources.textures.get("spiral-galaxy")
			});
			
			StarMap.mesh = new THREE.Mesh( planeGeometry, material );

			StarMap.mesh.rotation.x = -0.5 * Math.PI;
		    StarMap.mesh.position.x = 0;
		    StarMap.mesh.position.y = 0;
		    StarMap.mesh.position.z = 0;

		});

		return loadPromise;

	}

	getMesh() {
		return this.mesh;
	}

}