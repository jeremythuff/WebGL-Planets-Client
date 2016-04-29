import { THREE } from 'three';
import { Entity } from "engine/model/Entity";

export class AbstractPlanet extends Entity {
	constructor(properties) {

		super();

		let AbstractPlanet = this;

		AbstractPlanet._unloadedResources = new Set();

		AbstractPlanet._size = properties.size !== undefined ? properties.size : 0.5;
		AbstractPlanet._atmosphereSize = properties.atmosphereSize !== undefined ? properties.atmosphereSize : AbstractPlanet._size*0.02;
		AbstractPlanet._rotationSpeed = properties.rotationSpeed !== undefined ? (1/properties.rotationSpeed) : 28;
		AbstractPlanet._windSpeed = properties.windSpeed !== undefined ? (1/properties.windSpeed) : 1/140;

		if(properties.map) AbstractPlanet._unloadedResources.add(properties.map);
		if(properties.bump) AbstractPlanet._unloadedResources.add(properties.bump);
		if(properties.spec) AbstractPlanet._unloadedResources.add(properties.spec);
		if(properties.atmosphere) AbstractPlanet._unloadedResources.add(properties.atmosphere);


	}

	load() {

		let AbstractPlanet = this;

		let loadPromise = AbstractPlanet.assetLoader.loadAll(AbstractPlanet._unloadedResources).then(function(resources) {
		
			let planetGeometry  = new THREE.SphereGeometry(AbstractPlanet._size, 32, 32);
			let planetMaterial  = new THREE.MeshPhongMaterial({
				map: resources.textures.get("map"),
				bumpMap: resources.textures.get("bump"),
				bumpScale: 0.005,
				specularMap: resources.textures.get("spec"),
				specular: new THREE.Color('grey')
			});
			
			AbstractPlanet._mesh = new THREE.Mesh(planetGeometry, planetMaterial);
			AbstractPlanet._mesh.recievesShadow = true;

			let atmosphereGeometry   = new THREE.SphereGeometry(AbstractPlanet._size+AbstractPlanet._atmosphereSize, 32, 32);
			let atmosphereMaterial  = new THREE.MeshPhongMaterial({
				map     : resources.textures.get("atmosphere"),
				side        : THREE.DoubleSide,
				opacity     : 0.9,
				transparent : true,
				depthWrite  : false
			});
			
			AbstractPlanet.atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
			AbstractPlanet.atmosphereMesh.castShadow = true;

			AbstractPlanet._mesh.add(AbstractPlanet.atmosphereMesh);

			AbstractPlanet.loaded = true;

		});

		return loadPromise;

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