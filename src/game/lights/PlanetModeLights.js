export class PlanetModeLights {
	constructor(scene) {
		this.ambientLight = new THREE.AmbientLight( 0x555555 ); // soft white light 
		this.spotLight = new THREE.SpotLight(0xbbbbbb);
    	this.spotLight.position.set(500, 500, 50);
    	this.spotLight.castShadow = true;

    	scene.add(this.ambientLight);
		scene.add(this.spotLight);
	}

}