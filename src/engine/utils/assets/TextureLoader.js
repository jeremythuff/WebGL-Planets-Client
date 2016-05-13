import { THREE } from 'three';

export class TextureLoader {
	constructor(manager) {
		return new THREE.TextureLoader(manager);
	}
}