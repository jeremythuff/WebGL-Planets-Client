import { AssetLoader } from "./../../engine/utils/AssetLoader.js"
import { Texture } from "./../../engine/model/Texture.js"

let assetLoader = new AssetLoader();

export class Planet {
	constructor() {
		let Planet = this;
		Planet.loaded = false;
		Planet.mesh = null;
	}

	load() {

		let Planet = this;

		let loadPromise = assetLoader.loadAll([
			new Texture("src/game/resources/textures/earth/earthmap.jpg"),
			new Texture("src/game/resources/textures/earth/earthbump.jpg"),
			new Texture("src/game/resources/textures/earth/earthspec.jpg"),
			new Texture("src/game/resources/textures/earth/clouds.png")
		]).then(function(resources) {
		
			let planetGeometry  = new THREE.SphereGeometry(0.5, 32, 32)
			let planetMaterial  = new THREE.MeshPhongMaterial({
				map: resources.textures.get("earthmap"),
				bumpMap: resources.textures.get("earthbump"),
				bumpScale: 0.005,
				specularMap: resources.textures.get("earthspec"),
				specular: new THREE.Color('grey')
			});
			
			Planet.mesh = new THREE.Mesh(planetGeometry, planetMaterial);
			Planet.mesh.recievesShadow = true;

			let clodGeometry   = new THREE.SphereGeometry(0.508, 32, 32)
			let cloudMaterial  = new THREE.MeshPhongMaterial({
				map     : resources.textures.get("clouds"),
				side        : THREE.DoubleSide,
				opacity     : 0.9,
				transparent : true,
				depthWrite  : false
			});
			
			Planet.cloudMesh = new THREE.Mesh(clodGeometry, cloudMaterial);
			Planet.cloudMesh.castShadow = true;

			Planet.mesh.add(Planet.cloudMesh);

			Planet.loaded = true;

		});

		return loadPromise;

	}

	getMesh() {
		return this.mesh;
	}

	getCloudMesh() {
		return this.cloudMesh;
	}

	update(delta) {
	
		let planet = this;
	
		if(!planet.loaded) return;
		
		planet.getMesh().rotation.y  += 1/28 * delta;
		planet.getCloudMesh().rotation.y  += 1/120 * delta;
		planet.getCloudMesh().rotation.x  += 1/240 * delta;
	
	}
}