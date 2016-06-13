import THREE from 'THREE';

export class PlanetModeLights {
	constructor() {
		
		let PlanetModeLights = this;

		PlanetModeLights._spotLight = new THREE.SpotLight(0x999999,1);
    	PlanetModeLights._spotLight.position.set(6, 4, 6);
    	PlanetModeLights._spotLight.castShadow = true;

	}

	getSpotlight() {
		return this._spotLight;
	}

}