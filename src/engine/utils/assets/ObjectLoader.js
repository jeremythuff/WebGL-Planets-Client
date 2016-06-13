import THREE from 'THREE';

export class ObjectLoader {
	constructor(manager) {

		let ObjectLoader = this;

		ObjectLoader.loadObj = new THREE.ObjectLoader(manager);
		ObjectLoader.loadJson = new THREE.JSONLoader(manager);
	
	}
}