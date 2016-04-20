import { THREE } from 'three';
import { AssetLoader } from "engine/utils/AssetLoader";
import { Shader } from "engine/model/Shader";
import { Texture } from "engine/model/Texture";

let assetLoader = new AssetLoader();

export class Star {
	constructor(temp, size, position) {
		let Star = this;
		Star.loaded = false;
		Star._mesh;
		Star.flow = 0.0;
		Star.color = temp ? temp : 0xffffff;
		Star.size = size ? size : 5;
		console.log(size);
		Star.position = position ? position : {x:0,y:0};
	}

	load() {

		let Star = this;

		let starColor = new THREE.Color(Star.color);
		
		let loadAllPromise = assetLoader.loadAll([
			new Shader("src/game/resources/shaders/sun.fs.glsl"),		
			new Shader("src/game/resources/shaders/sun.vs.glsl"),
			new Texture("src/game/resources/textures/star/corona.png", "coronaMap"),
			new Texture("src/game/resources/textures/star/blink.png", "raysMap")
		]).then(function(resources) {
			
			let starMesh = new THREE.Object3D();

			let uniforms = {
				flow: { type: 'f', value: 0.01 },
			  	color:     { type: "c", value: new THREE.Color( Star.color ) },
			};

			Star.uniforms = uniforms;

			let widthSegments = 64;
			let heightSegments = 64;

			let baseGeometry  = new THREE.SphereBufferGeometry(Star.size, 16, 16);

			let vertexCount = ( ( widthSegments + 1 ) * ( heightSegments + 1 ) );
			
			let baseMaterial = new THREE.ShaderMaterial({
				uniforms:       uniforms,
				vertexShader:   resources.shaders.get("sun-vs").program,
				fragmentShader: resources.shaders.get("sun-fs").program
			});
			let baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
			baseMesh.position.x = Star.position.x;
			baseMesh.position.y = Star.position.y;
			starMesh.add(baseMesh);

			let coronaMaterial = new THREE.SpriteMaterial({
				map: resources.textures.get("coronaMap"),
				transparent: true,
				opacity: 1.25,
				color: starColor.clone().addScalar(0.4)
			});
			let coronaMesh = new THREE.Sprite(coronaMaterial)
			
			Star.corona = coronaMesh;
			Star.corona.scale.set(Star.size*4,Star.size*4,1);
			
			starMesh.add(Star.corona);

			let rayOneMaterial = new THREE.SpriteMaterial({
				map: resources.textures.get("raysMap"),
				transparent: true,
				opacity: 1,
				depthWrite: false,
				depthTest: false,
				color: starColor.clone().addScalar(15)
			});
			let rayOneMesh = new THREE.Sprite(rayOneMaterial)
			
			Star.raysOne = rayOneMesh;
			Star.raysOne.fading = true;
			Star.raysOne.scale.set(Star.size*8,Star.size*8,1);

			starMesh.add(Star.raysOne);

			let rayTwoMaterial = new THREE.SpriteMaterial({
				map: resources.textures.get("raysMap"),
				transparent: true,
				opacity: 0.25,
				rotation: 7,
				color: starColor.clone().addScalar(0.5)
			});
			let rayTwoMesh = new THREE.Sprite(rayTwoMaterial);
			
			Star.raysTwo = rayTwoMesh;
			Star.raysTwo.fading = true;
			Star.raysTwo.scale.set(Star.size*10,Star.size*10,1);

			starMesh.add(Star.raysTwo);

			Star._mesh = starMesh;
			Star.loaded = true;

		});

		return loadAllPromise;

	}

	getMesh() {
		return this._mesh;
	}

	update(delta) {

		let Star = this;
		if(!Star.loaded) return;
		
		Star.uniforms.flow.value = Star.flow;

		Star.flow +=  Math.sin(delta * 0.25);

		let fadeValue = 0.025 * delta
		if(!Star.raysFadeToggle) fadeValue = -(fadeValue);

		Star.raysOne.material.rotation += 0.01 * delta;
		Star.raysOne.material.opacity += fadeValue;

		Star.raysTwo.material.rotation -= 0.005 * delta;
		Star.raysTwo.material.opacity -= fadeValue;

		Star.corona.material.opacity += fadeValue*2;		

		if(Star.raysOne.material.opacity > 1) Star.raysFadeToggle = false;
		if(Star.raysOne.material.opacity < 0.75) Star.raysFadeToggle = true;

	}

}