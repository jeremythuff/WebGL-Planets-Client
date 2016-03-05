import { THREE } from 'three';
import { AssetLoader } from "engine/utils/AssetLoader.js"
import { Texture } from "engine/model/Texture.js"
import { Shader } from "engine/model/Shader.js"

let assetLoader = new AssetLoader();

export class StarMap {
	constructor(data) {
		let StarMap = this;
		this._data = data;
		this._mesh = null;
	}

	load() {
		
		let StarMap = this;

		let starMapMesh = new THREE.Object3D();

		// let loadPromise = assetLoader.loadAll([]).then(function() {
	
			

		// });

		let starGeometry  = new THREE.SphereGeometry(0.25, 32, 32);

		let starMaterialYellow  = new THREE.MeshPhongMaterial({ color: 0xfff14c});
		let starMaterialRed  = new THREE.MeshPhongMaterial({ color: 0xe53939});
		let starMaterialBlue  = new THREE.MeshPhongMaterial({ color: 0x3d6dba});
		let starMaterialWhite  = new THREE.MeshPhongMaterial({ color: 0xebeef4});
		let starMaterialBlack  = new THREE.MeshPhongMaterial({ color: 0x3e4a5e});

		let starTypes = [starMaterialYellow, starMaterialRed, starMaterialBlue, starMaterialWhite, starMaterialBlack]

		let startX = -24;
		let startY = 24;
		let count = 0;
		let startype = 0;
		for(let i=0; i<500; i++) {

			if(startype == 5) startype = 0;

			let newStar =new THREE.Mesh(starGeometry, starTypes[startype]);
			newStar.position.x = startX+i;
			newStar.position.y = startY;

			starMapMesh.add(newStar);
			count++;
			startype++;

			if(count == 49) {
				startY--;
				startX-=49;
				count = 0;
			}
		}

		StarMap._mesh = starMapMesh;
		StarMap._mesh.position.z = 1

		return this;
	}

	update() {

	}

	getMesh() {
		return this._mesh
	}

}