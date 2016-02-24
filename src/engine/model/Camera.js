export class Camera {
	constructor( fov, aspect, near, far) {
		
		this.PerspectiveCamera = new THREE.PerspectiveCamera( fov, aspect, near, far );
		this.registerResizeEvent();

		return this.PerspectiveCamera;
	}

	registerResizeEvent() {
		let camera = this;
		window.addEventListener('resize', function(){
			camera.PerspectiveCamera.aspect = window.innerWidth / window.innerHeight;
	    	camera.PerspectiveCamera.updateProjectionMatrix();
		});
	}
}