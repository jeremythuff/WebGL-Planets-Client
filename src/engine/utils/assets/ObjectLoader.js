import { THREE } from 'three';

export class ObjectLoader {
	constructor(manager) {

		let ObjectLoader = this;

		ObjectLoader.loadObj = new THREE.ObjectLoader(manager);
		ObjectLoader.loadJson = new THREE.JSONLoader(manager);
	
	}
}