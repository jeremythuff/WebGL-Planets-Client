export class PlanetModeLights {
	constructor() {
		this.ambientLight = new THREE.AmbientLight( 0x555555 ); // soft white light 
		this.spotLight = new THREE.SpotLight(0xbbbbbb,1);
    	this.spotLight.position.set(5, 3, 5);
    	this.spotLight.castShadow = true;
	}

	getAmbientLight() {
		return this.ambientLight;
	}

	getSpotlight() {
		return this.spotLight;
	}

}