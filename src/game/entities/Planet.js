import { TextureLoader } from "./../../engine/utils/TextureLoader.js"

export class Planet {
	constructor() {
		

		this.geometry  = new THREE.SphereGeometry(0.5, 32, 32)
		this.material  = new THREE.MeshPhongMaterial();
		this.material.map    = THREE.ImageUtils.loadTexture('src/game/resources/textures/earth/earthmap1k.jpg');
		this.material.bumpMap    = THREE.ImageUtils.loadTexture('src/game/resources/textures/earth/earthbump1k.jpg')
		this.material.bumpScale = 0.05;
		this.material.specularMap    = THREE.ImageUtils.loadTexture('src/game/resources/textures/earth/earthspec1k.jpg');
		this.material.specular  = new THREE.Color('grey');
		this.mesh = new THREE.Mesh(this.geometry, this.material);

		this.clodGeometry   = new THREE.SphereGeometry(0.505, 32, 32)
		this.cloudMaterial  = new THREE.MeshPhongMaterial({
		  map     : THREE.ImageUtils.loadTexture('src/game/resources/textures/earth/clouds.jpg'),
		  side        : THREE.DoubleSide,
		  opacity     : 0.3,
		  transparent : true,
		  depthWrite  : false,
		});
		this.cloudMesh = new THREE.Mesh(this.clodGeometry, this.cloudMaterial)
		this.mesh.add(this.cloudMesh);

	}

	getMesh() {
		return this.mesh;
	}
}