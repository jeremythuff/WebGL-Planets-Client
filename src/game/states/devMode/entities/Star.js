import { THREE } from 'three';
import { AssetLoader } from "engine/utils/AssetLoader";
import { Shader } from "engine/model/Shader";

let assetLoader = new AssetLoader();

export class Star {
	constructor() {
		let Star = this;
		Star.loaded = false;
		Star._mesh = this;
		Star.count = 0.1;
	}

	load() {
		let Star = this;
		
		let loadAllPromise = assetLoader.loadAll([
			new Shader("src/game/resources/shaders/sun.fs.glsl"),		
			new Shader("src/game/resources/shaders/sun.vs.glsl")
		]).then(function(resources) {
			

			let starMesh = new THREE.Object3D();

			let uniforms = {
				amplitude: {
					type: 'f', // a float
					value: 0.01
			  	}
			};

			Star.uniforms = uniforms;

			let widthSegments = 64;
			let heightSegments = 64;

			let baseGeometry  = new THREE.SphereBufferGeometry(5, 32, 32);

			let vertexCount = ( ( widthSegments + 1 ) * ( heightSegments + 1 ) );

			let values = new Float32Array(vertexCount)

			for (let v = 0; v < vertexCount; v++) {
			  values[v] = (Math.random() * 0.25);
			}

			console.log(values)

			baseGeometry.addAttribute( 'displacement', new THREE.BufferAttribute( values, 1));
			
			let baseMaterial = new THREE.ShaderMaterial({
				uniforms:       uniforms,
				vertexShader:   resources.shaders.get("sun-vs").program,
				fragmentShader: resources.shaders.get("sun-fs").program
			});
			let baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
			starMesh.add(baseMesh);

			Star._mesh = starMesh;
			Star.loaded = true;

		});

		return loadAllPromise;

	}

	getMesh() {
		return this._mesh;
	}

	update(delta, camera) {

		let Star = this;
		if(!Star.loaded) return;
		
		Star.uniforms.amplitude.value = Math.sin(Star.count);

		Star.count += 0.1;

	}

}