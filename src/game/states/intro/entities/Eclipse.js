import { THREE } from 'three';
import { Entity } from "engine/model/Entity";

export class Eclipse extends Entity {
	constructor() {		
		super();
	}

	load() {

		let Eclipse = this;

		let eclipseMesh = new THREE.Object3D();
		let planetGeometry  = new THREE.SphereGeometry(5, 64, 64);
		let planetMesh = new THREE.Mesh(planetGeometry, new THREE.MeshPhongMaterial({ color: 0x121212}));
		planetMesh.geometry.computeVertexNormals();
		eclipseMesh.add(planetMesh);

		Eclipse._mesh = eclipseMesh;

		return this;

	}

}