import THREE from 'THREE';

export class MapModeLights {
	constructor() {

		let MapModeLights = this;

		MapModeLights._ambientLight = new THREE.AmbientLight( 0x666666 ); // soft white light 
		MapModeLights._spotLight = new THREE.SpotLight(0x555555, 1);
    	MapModeLights._spotLight.position.set(0, -15, 40);
    	//MapModeLights._spotLight.target.position.set( 10, 10, 10 );
    	MapModeLights._spotLight.castShadow = false;
	}

	getAmbientLight() {
		return this._ambientLight;
	}

	getSpotLight() {
		return this._spotLight;
	}

}