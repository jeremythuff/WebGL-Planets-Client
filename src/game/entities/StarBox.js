import THREE from 'THREE';
import { Texture } from "engine/model/Texture";
import { Entity } from "engine/model/Entity";

export class StarBox extends Entity {
	constructor() {
		super();
	}

	load() {

		let StarBox = this;

		let loadPromise = StarBox.assetLoader.loadAll([
			new Texture("src/game/resources/textures/starfield.png")
		]).then(function(resources) {

			let geometry  = new THREE.SphereGeometry(90, 32, 32);
			let material  = new THREE.MeshBasicMaterial({
				transparent: true, 
				opacity: 0.5,
				map: resources.textures.get("starfield"),
				side: THREE.BackSide
			});
			
			StarBox._mesh  = new THREE.Mesh(geometry, material);
			StarBox.loaded = true;
			
		});

		return loadPromise;

	}
	
}