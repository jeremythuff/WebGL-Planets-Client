import { THREE } from 'three';

export class Renderer {
	constructor() {
		return new THREE.WebGLRenderer();
	}
}