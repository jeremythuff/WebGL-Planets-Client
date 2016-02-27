import { AssetLoader } from "./../../engine/utils/AssetLoader.js"
import { Texture } from "./../../engine/model/Texture.js"

let assetLoader = new AssetLoader();

export class StarMap {
	constructor() {
		let StarMap = this;
		StarMap.loaded = false;
		StarMap.mesh = null;
		StarMap.spin = "left"
	}

	load() {

		let StarMap = this;

		let loadPromise = assetLoader.loadAll([
			new Texture("src/game/resources/textures/spiral-galaxy.png")
		]).then(function(resources) {

			let planeGeometry = new THREE.PlaneGeometry(180, 180, 1, 1);
			let material  = new THREE.MeshPhongMaterial({
				transparent: true, 
				opacity: 0.5,
				map: resources.textures.get("spiral-galaxy")
			});
			
			StarMap.mesh = new THREE.Mesh( planeGeometry, material );
			StarMap.loaded = true;

		});

		return loadPromise;

	}

	update(delta) {
		let StarMap = this;
		if(!StarMap.loaded) return;
		
		if(StarMap.getMesh().rotation.z > 0.025)
			StarMap.spin = "left"

		if(StarMap.getMesh().rotation.z < -0.025)
			StarMap.spin = "right"
			
		if(StarMap.spin == "right") StarMap.getMesh().rotation.z  += 1/120 * delta;
		if(StarMap.spin == "left") StarMap.getMesh().rotation.z  -= 1/120 * delta;

	}

	getMesh() {
		return this.mesh;
	}

}