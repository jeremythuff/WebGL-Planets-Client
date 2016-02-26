import { AssetLoader } from "./../../engine/utils/AssetLoader.js"
import { Texture } from "./../../engine/model/Texture.js"

export class Planet {
	constructor(scene) {
		let Planet = this;
		let assetLoader = new AssetLoader();

		let loadPromise = assetLoader.loadAll([
			new Texture("src/game/resources/textures/earth/earthmap1k.jpg"),
			new Texture("src/game/resources/textures/earth/earthbump1k.jpg"),
			new Texture("src/game/resources/textures/earth/earthspec1k.jpg"),
			new Texture("src/game/resources/textures/earth/clouds.png")
		]);

		Planet.loaded = false;		

		loadPromise.then(function(resources) {
		
			Planet.geometry  = new THREE.SphereGeometry(0.5, 32, 32)
			Planet.material  = new THREE.MeshPhongMaterial();
			Planet.material.map = resources.textures.get("earthmap1k");
			Planet.material.bumpMap = resources.textures.get("earthbump1k");
			Planet.material.bumpScale = 0.005;
			Planet.material.specularMap = resources.textures.get("earthspec1k");
			Planet.material.specular  = new THREE.Color('grey');
			Planet.mesh = new THREE.Mesh(Planet.geometry, Planet.material);
			Planet.mesh.recievesShadow = true;

			Planet.clodGeometry   = new THREE.SphereGeometry(0.508, 32, 32)
			Planet.cloudMaterial  = new THREE.MeshPhongMaterial({
			  map     : resources.textures.get("clouds"),
			  side        : THREE.DoubleSide,
			  opacity     : 0.9,
			  transparent : true,
			  depthWrite  : false,
			});
			Planet.cloudMesh = new THREE.Mesh(Planet.clodGeometry, Planet.cloudMaterial);
			Planet.cloudMesh.castShadow = true;
			Planet.mesh.add(Planet.cloudMesh);

			scene.add(Planet.getMesh());
			Planet.loaded = true;
		});

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