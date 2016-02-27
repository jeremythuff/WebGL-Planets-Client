export class MapModeLights {
	constructor() {
		this._ambientLight = new THREE.AmbientLight( 0x666666 ); // soft white light 
	}

	getAmbientLight() {
		return this._ambientLight;
	}

}