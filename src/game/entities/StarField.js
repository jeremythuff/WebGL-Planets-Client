import { AssetLoader } from "./../../engine/utils/AssetLoader.js"
import { Texture } from "./../../engine/model/Texture.js"

let assetLoader = new AssetLoader();

export class Starfield {
	constructor() {

		let Starfield = this;
		Starfield.loaded = false;
		Starfield.mesh = null;

	}

	load() {

		let Starfield = this;

		let loadPromise = assetLoader.loadAll([
			new Texture("src/game/resources/textures/starfield.png")
		]).then(function(resources) {

			let geometry  = new THREE.SphereGeometry(90, 32, 32);
			let material  = new THREE.MeshBasicMaterial({
				transparent: true, 
				opacity: 0.5,
				map: resources.textures.get("starfield"),
				side: THREE.BackSide
			});
			
			Starfield.mesh  = new THREE.Mesh(geometry, material);
			Starfield.loaded = true
			
		});

		return loadPromise;

	}

	getMesh() {
		return this.mesh;
	}
}