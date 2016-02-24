export class PlanetModeLights {
	constructor() {
		this.ambientLight = new THREE.AmbientLight( 0x555555 ); // soft white light 
		this.spotLight = new THREE.SpotLight(0xbbbbbb);
    	this.spotLight.position.set(500, 500, 50);
    	this.spotLight.castShadow = true;
	}

	getAmbientLight() {
		return this.ambientLight;
	}

	getSpotlight() {
		return this.spotLight;
	}

}