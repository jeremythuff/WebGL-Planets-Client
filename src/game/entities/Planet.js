import { AssetLoader } from "./../../engine/utils/AssetLoader.js"

let assetLoader = new AssetLoader();

export class Planet {
	constructor() {

		// let loadPromise = assetLoader.loadAll([
		// 	{
		// 		"type": "texture",
		// 		"url": "src/game/resources/textures/earth/earthmap1k.jpg",
		// 	}
		// ]);		

		// loadPromise.then(function(resources) {
		// 	console.log(resources);
		// });


		this.geometry  = new THREE.SphereGeometry(0.5, 32, 32)
		this.material  = new THREE.MeshPhongMaterial();
		this.material.map    = THREE.ImageUtils.loadTexture('src/game/resources/textures/earth/earthmap1k.jpg');
		this.material.bumpMap    = THREE.ImageUtils.loadTexture('src/game/resources/textures/earth/earthbump1k.jpg')
		this.material.bumpScale = 0.005;
		this.material.specularMap    = THREE.ImageUtils.loadTexture('src/game/resources/textures/earth/earthspec1k.jpg');
		this.material.specular  = new THREE.Color('grey');
		this.mesh = new THREE.Mesh(this.geometry, this.material);

		this.clodGeometry   = new THREE.SphereGeometry(0.508, 32, 32)
		this.cloudMaterial  = new THREE.MeshPhongMaterial({
		  map     : THREE.ImageUtils.loadTexture('src/game/resources/textures/earth/clouds.png'),
		  side        : THREE.DoubleSide,
		  opacity     : 0.9,
		  transparent : true,
		  depthWrite  : false,
		});
		this.cloudMesh = new THREE.Mesh(this.clodGeometry, this.cloudMaterial);
		this.cloudMesh.castShadow = true;
		this.mesh.add(this.cloudMesh);

	}

	getMesh() {
		return this.mesh;
	}

	getCloudMesh() {
		return this.cloudMesh;
	}

	update(delta) {
		let planet = this;
		planet.getMesh().rotation.y  += 1/28 * delta;
		planet.getCloudMesh().rotation.y  += 1/120 * delta;
		planet.getCloudMesh().rotation.x  += 1/240 * delta;
	}
}