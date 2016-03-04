import { THREE } from 'three';
import { AssetLoader } from "./../../engine/utils/AssetLoader.js"
import { Texture } from "./../../engine/model/Texture.js"

let assetLoader = new AssetLoader();

export class StarBox {
	constructor() {

		let StarBox = this;
		StarBox.loaded = false;
		StarBox.mesh = null;

	}

	load() {

		let StarBox = this;

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
			
			StarBox.mesh  = new THREE.Mesh(geometry, material);
			StarBox.loaded = true
			
		});

		return loadPromise;

	}

	getMesh() {
		return this.mesh;
	}
}