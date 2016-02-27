export class PlanetModeLights {
	constructor() {
		
		this._spotLight = new THREE.SpotLight(0x999999,1);
    	this._spotLight.position.set(6, 4, 6);
    	this._spotLight.castShadow = true;

	}

	getSpotlight() {
		return this._spotLight;
	}

}