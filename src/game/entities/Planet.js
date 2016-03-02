import { AssetLoader } from "./../../engine/utils/AssetLoader.js"

let assetLoader = new AssetLoader();

export class Planet {
	constructor(properties) {
		let Planet = this;
		Planet.loaded = false;
		Planet.mesh = null;

		Planet._unloadedResources = new Set();

		Planet._size = properties.size !== undefined ? properties.size : 0.5;
		Planet._atmosphereSize = properties.atmosphereSize !== undefined ? properties.atmosphereSize : Planet._size*0.02;
		Planet._rotationSpeed = properties.rotationSpeed !== undefined ? (1/properties.rotationSpeed) : 28;
		Planet._windSpeed = properties.windSpeed !== undefined ? (1/properties.windSpeed) : 1/140;

		if(properties.map) Planet._unloadedResources.add(properties.map);
		if(properties.bump) Planet._unloadedResources.add(properties.bump);
		if(properties.spec) Planet._unloadedResources.add(properties.spec);
		if(properties.atmosphere) Planet._unloadedResources.add(properties.atmosphere);


	}

	load() {

		let Planet = this;

		let loadPromise = assetLoader.loadAll(Planet._unloadedResources).then(function(resources) {
		
			let planetGeometry  = new THREE.SphereGeometry(Planet._size, 32, 32)
			let planetMaterial  = new THREE.MeshPhongMaterial({
				map: resources.textures.get("map"),
				bumpMap: resources.textures.get("bump"),
				bumpScale: 0.005,
				specularMap: resources.textures.get("spec"),
				specular: new THREE.Color('grey')
			});
			
			Planet.mesh = new THREE.Mesh(planetGeometry, planetMaterial);
			Planet.mesh.recievesShadow = true;

			let atmosphereGeometry   = new THREE.SphereGeometry(Planet._size+Planet._atmosphereSize, 32, 32)
			let atmosphereMaterial  = new THREE.MeshPhongMaterial({
				map     : resources.textures.get("atmosphere"),
				side        : THREE.DoubleSide,
				opacity     : 0.9,
				transparent : true,
				depthWrite  : false
			});
			
			Planet.atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
			Planet.atmosphereMesh.castShadow = true;

			Planet.mesh.add(Planet.atmosphereMesh);

			Planet.loaded = true;

		});

		return loadPromise;

	}

	getMesh() {
		return this.mesh;
	}

	getAtmosphereMesh() {
		return this.atmosphereMesh;
	}

	update(delta) {
	
		let planet = this;
		if(!planet.loaded) return;
		
		planet.getMesh().rotation.y  += planet._rotationSpeed * delta;
		planet.getAtmosphereMesh().rotation.y  += planet._windSpeed * delta;
		planet.getAtmosphereMesh().rotation.x  += planet._windSpeed/2 * delta;
	
	}
}