import { THREE } from 'three';

export class ThreeTextureLoader {
	constructor(manager) {
		return new THREE.TextureLoader(manager);
	}
}