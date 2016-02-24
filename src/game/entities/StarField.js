export class Starfield {
	constructor() {
		// create the geometry sphere
		this.geometry  = new THREE.SphereGeometry(90, 32, 32);
		// create the material, using a texture of startfield
		this.material  = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.0});
		this.material.map   = THREE.ImageUtils.loadTexture('src/game/resources/textures/starfield.png');
		this.material.side  = THREE.BackSide
		this.material.opacity = 0.5;
		// create the mesh based on geometry and material
		this.mesh  = new THREE.Mesh(this.geometry, this.material);
	}

	getMesh() {
		return this.mesh;
	}
}