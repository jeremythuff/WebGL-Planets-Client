import { THREE } from 'three';
import { AssetLoader } from "engine/utils/AssetLoader";
import { Texture } from "engine/model/Texture";

let assetLoader = new AssetLoader();

export class Star {
	constructor() {
		let Star = this;
		Star.loaded = false;
		Star._mesh = this;
	}

	load() {
		let Star = this;
		
		let loadAllPromise = assetLoader.loadAll([
			new Texture("src/game/resources/textures/star/sunOuter.png", "outerMap"),
			new Texture("src/game/resources/textures/star/sunBase.png", "baseMap"),
			new Texture("src/game/resources/textures/star/corona.png", "coronaMap"),
			new Texture("src/game/resources/textures/star/blink.png", "raysMap")
		]).then(function(resources) {
			

			let starMesh = new THREE.Object3D();

			let starColor = new THREE.Color(0xff6905);

			let baseGeometry  = new THREE.SphereGeometry(5, 64, 64);
			let baseMaterial = new THREE.MeshLambertMaterial({
				map: resources.textures.get("baseMap"),
				color: starColor
			});
			let baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
			
			starMesh.add(baseMesh);

			let outerGeometry  = new THREE.SphereGeometry(5.01, 64, 64);
			let outerMaterial = new THREE.MeshLambertMaterial({
				map: resources.textures.get("baseMap"),
				color: starColor.clone().addScalar(3),
				transparent: true,
				opacity: 0.25
			});
			let outerMeshOne = new THREE.Mesh(outerGeometry, outerMaterial);
			Star.outerMeshOne = outerMeshOne;
			starMesh.add(outerMeshOne);

			let outerGeometryTwo  = new THREE.SphereGeometry(5.02, 64, 64);
			let outerMaterialTwo = new THREE.MeshLambertMaterial({
				map: resources.textures.get("baseMap"),
				color: starColor.clone().addScalar(-2),
				transparent: true,
				opacity: 0.35
			});
			let outerMeshTwo = new THREE.Mesh(outerGeometryTwo, outerMaterialTwo);
			Star.outerMeshTwo = outerMeshTwo;
			starMesh.add(outerMeshTwo);

			let coronaMaterial = new THREE.SpriteMaterial({
				map: resources.textures.get("coronaMap"),
				transparent: true,
				opacity: 0.95,
				color: starColor.clone().addScalar(1)
			});
			let coronaMesh = new THREE.Sprite(coronaMaterial)
			
			Star.corona = coronaMesh;
			Star.corona.scale.set(13.5,13.5,1);
			
			starMesh.add(Star.corona);

			let rayOneMaterial = new THREE.SpriteMaterial({
				map: resources.textures.get("raysMap"),
				transparent: true,
				opacity: 0.2,
				depthWrite: false,
				depthTest: false,
				color: starColor.clone().addScalar(10)
			});
			let rayOneMesh = new THREE.Sprite(rayOneMaterial)
			
			Star.raysOne = rayOneMesh;
			Star.raysOne.fading = true;
			Star.raysOne.scale.set(30,30,1);

			starMesh.add(Star.raysOne);

			let rayTwoMaterial = new THREE.SpriteMaterial({
				map: resources.textures.get("raysMap"),
				transparent: true,
				opacity: 0.05,
				rotation: 7,
				color: starColor.clone().addScalar(0.5)
			});
			let rayTwoMesh = new THREE.Sprite(rayTwoMaterial);
			
			Star.raysTwo = rayTwoMesh;
			Star.raysTwo.fading = true;
			Star.raysTwo.scale.set(30,30,1);

			starMesh.add(Star.raysTwo);

			Star.light = new THREE.PointLight( 0xff0000, 1, 100 );
			starMesh.add(Star.light);

			Star._mesh = starMesh;
			Star.loaded = true;

		});

		return loadAllPromise;

	}

	getMesh() {
		return this._mesh;
	}

	update(delta, camera) {

		let Star = this;
		if(!Star.loaded) return;
		
		Star.getMesh().rotation.y  += 0.025 * delta;

		Star.outerMeshOne.rotation.y  -= 0.025 * delta;
		Star.outerMeshOne.rotation.x  += 0.035 * delta;

		Star.outerMeshTwo.rotation.y  += 0.035 * delta;
		Star.outerMeshTwo.rotation.x  -= 0.025 * delta;

		let fadeValue = 0.05 * delta
		if(!Star.raysFadeToggle) fadeValue = -(fadeValue);

		Star.raysOne.material.rotation += 0.045 * delta;
		Star.raysOne.material.opacity += fadeValue;

		Star.raysTwo.material.rotation -= 0.025 * delta;
		Star.raysTwo.material.opacity -= fadeValue;

		if(Star.raysOne.material.opacity > 0.2) Star.raysFadeToggle = false;
		if(Star.raysOne.material.opacity < 0.1) Star.raysFadeToggle = true;
		
	}

}