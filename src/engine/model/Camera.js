export class Camera {
	constructor( fov, aspect, near, far) {
		return new THREE.PerspectiveCamera( fov, aspect, near, far );
	}
}