import { AssetLoader } from "./../../engine/utils/AssetLoader.js"
import { Texture } from "./../../engine/model/Texture.js"

let assetLoader = new AssetLoader();

export class StarMap {
	constructor() {
		let StarMap = this;
		StarMap.loaded = false;
		StarMap.mesh = null;
		StarMap.spin = "left";
		StarMap.fade = false;
	}

	load() {

		let StarMap = this;

		let loadPromise = assetLoader.loadAll([
			new Texture("src/game/resources/textures/spiral-galaxy.png"),		
			new Texture("src/game/resources/textures/glowSpan.png")		
		]).then(function(resources) {

			StarMap.mesh = new THREE.Object3D();

			let nebulaGeometry = new THREE.PlaneGeometry(180, 180, 1, 1);
			let nebulaMaterial  = new THREE.MeshPhongMaterial({
				transparent: true, 
				opacity: 0.5,
				map: resources.textures.get("spiral-galaxy")
			});
			
			StarMap.nubulaMesh = new THREE.Mesh( nebulaGeometry, nebulaMaterial );

			let cylinerGeometry = new THREE.CylinderGeometry( 5, 180, 0, (360/8) - 1, 100);
			let cylinderMaterial = new THREE.MeshBasicMaterial({
				map: resources.textures.get("glowSpan"),
				blending: THREE.AdditiveBlending,
				transparent: true,
				depthTest: false,
				depthWrite: false,		
				wireframe: true,
				opacity: 0.25,
			});
			StarMap.cylinderMesh = new THREE.Mesh( cylinerGeometry, cylinderMaterial );

			StarMap.cylinderMesh.position.z = 5;			
			StarMap.cylinderMesh.rotation.x = Math.PI / 2;

			StarMap.cylinderMesh.material.map.wrapS = THREE.RepeatWrapping;
			StarMap.cylinderMesh.material.map.wrapT = THREE.RepeatWrapping;
			StarMap.cylinderMesh.material.map.needsUpdate = true;
			StarMap.cylinderMesh.material.map.onUpdate = function(){
				this.offset.y -= 0.001;
				this.needsUpdate = true;
			}			

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

		// if(StarMap.cylinderMesh.material.opacity < -0.05)
		// 	StarMap.fade = false;

		// if(StarMap.cylinderMesh.material.opacity > 0.2)
		// 	StarMap.fade = true

		// if(StarMap.fade) StarMap.cylinderMesh.material.opacity -= 0.001
		// if(!StarMap.fade) StarMap.cylinderMesh.material.opacity += 0.01
	

	}

	getMesh() {
		return this.mesh;
	}

	getNebulaMesh() {
		return this.nubulaMesh;
	}

}