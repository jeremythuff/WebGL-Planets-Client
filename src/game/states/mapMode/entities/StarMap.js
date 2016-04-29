import { THREE } from 'three';
import { Entity } from "engine/model/Entity";
//import { Texture } from "engine/model/Texture";
//import { Shader } from "engine/model/Shader";
import { Star } from "game/states/devMode/entities/Star";
import { Deferred } from "engine/extensions/Deferred";

export class StarMap extends Entity {
	constructor(data) {

		super();

		let StarMap = this;
		StarMap._data = data;
		StarMap._mesh = null;
		StarMap.stars = new Set();
	}

	load() {
		
		let StarMap = this;
		let starMapMesh = new THREE.Object3D();
		let starLoadPromises = new Set();

		let starMaterialYellow  = 0xfff14c;
		let starMaterialRed  = 0xe53939;
		let starMaterialBlue  = 0x3d6dba;
		let starMaterialWhite  = 0xebeef4;
		let starMaterialBlack  = 0x3e4a5e;

		let starTypes = [starMaterialYellow, starMaterialRed, starMaterialBlue, starMaterialWhite, starMaterialBlack];

		let startX = -24;
		let startY = 24;
		let count = 0;
		let startype = 0;
		let size = 0.1;
		for(let i=0; i<500; i++) {

			if(startype == 5) startype = 0;

			let position = {
				x: startX+i,
				y: startY
			};

			let newStar = new Star(starTypes[startype], size, position);

			StarMap.stars.add(newStar);
			starLoadPromises.add(newStar.load());
			
			count++;
			startype++;

			if(count == 49) {
				startY--;
				startX-=49;
				count = 0;
			}
		}

		StarMap._mesh = starMapMesh;
		StarMap._mesh.position.z = 1;
		
		let defer = new Deferred();

		Promise.all(starLoadPromises).then(function() {

			StarMap.stars.forEach(function(star) {
				StarMap.getMesh().add(star.getMesh());
			});

			defer.resolve();
		});

		return defer.promise;
	}

	update(delta) {

		let StarMap = this;

		if(StarMap.stars)
		StarMap.stars.forEach(function(star) {
			star.update(delta);
		});
	}

}