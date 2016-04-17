import { THREE } from 'three';

export class IntroLights {
	constructor() {

		let IntroLights = this;

		IntroLights._ambientLight = new THREE.AmbientLight( 0x666666 ); // soft white light 
		var directionalLight = new THREE.DirectionalLight( 0x2BEDE6, 100 );
		directionalLight.position.set( -3, 4.5, -2.5 );
	

		IntroLights._directionalLight = directionalLight;
	}

	getAmbientLight() {
		return this._ambientLight;
	}

	getDirectionalLight() {
		return this._directionalLight;
	}

}