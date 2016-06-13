import THREE from 'THREE';

export class ThreeTextureLoader {
	constructor(manager) {
		return new THREE.TextureLoader(manager);
	}
}