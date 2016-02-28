import { AssetLoader } from "./../../engine/utils/AssetLoader.js"
import { Texture } from "./../../engine/model/Texture.js"

let assetLoader = new AssetLoader();

export class StarMap {
	constructor() {
		let StarMap = this;
		StarMap.loaded = false;
		StarMap.mesh = null;
		StarMap.spin = "left";
	}

	load() {

		let StarMap = this;

		let loadPromise = assetLoader.loadAll([
			new Texture("src/game/resources/textures/spiral-galaxy.png")		]).then(function(resources) {

			StarMap.mesh = new THREE.Object3D();

			let nebulaGeometry = new THREE.PlaneGeometry(180, 180, 1, 1);
			let nebulaMaterial  = new THREE.MeshPhongMaterial({
				transparent: true, 
				opacity: 0.5,
				map: resources.textures.get("spiral-galaxy")
			});
			
			StarMap.nubulaMesh = new THREE.Mesh( nebulaGeometry, nebulaMaterial );

			let cylinerGeometry = new THREE.CylinderGeometry( 1, 180, 0, 8, 100);
			let cylinderMaterial = new THREE.MeshBasicMaterial({
					transparent: true,
					opacity: 0.05,
					wireframe: true
				});
			StarMap.cylinderMesh = new THREE.Mesh( cylinerGeometry, cylinderMaterial );

			StarMap.cylinderMesh.rotation.x = Math.PI / 2;			

			StarMap.mesh.add(StarMap.nubulaMesh);
			StarMap.mesh.add(StarMap.cylinderMesh);

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
			
		if(StarMap.spin == "right") StarMap.getNebulaMesh().rotation.z  += 1/120 * delta;
		if(StarMap.spin == "left") StarMap.getNebulaMesh().rotation.z  -= 1/120 * delta;


		// if(StarMap.cylinderMesh.material.opacity < 0.01)
		// 	StarMap.fade = false;

		// if(StarMap.cylinderMesh.material.opacity > 0.05)
		// 	StarMap.fade = true

		// if(StarMap.fade) StarMap.cylinderMesh.material.opacity -= 0.00025
		// if(!StarMap.fade) StarMap.cylinderMesh.material.opacity += 0.005
	

	}

	getMesh() {
		return this.mesh;
	}

	getNebulaMesh() {
		return this.nubulaMesh;
	}

}