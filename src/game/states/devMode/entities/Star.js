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
		Star.position = position ? position : {x:0,y:0};
		Star.rayOneFadeToggle = true;
		Star.rayOneFade = {
			max: 0.8,
			min: 0.5
		}
		Star.rayTwoFade = {
			max: 0.55,
			min: 0.25
		}
	}

	load() {

		let Star = this;

		let starColor = new THREE.Color(Star.color);
		
		let loadAllPromise = assetLoader.loadAll([
			new Shader("src/game/resources/shaders/sun.fs.glsl"),		
			new Shader("src/game/resources/shaders/sun.vs.glsl"),
			new Shader("src/game/resources/shaders/corona.fs.glsl"),		
			new Shader("src/game/resources/shaders/corona.vs.glsl"),
			new Texture("src/game/resources/textures/star/corona.png", "coronaMap"),
			new Texture("src/game/resources/textures/star/blink.png", "raysMap")
		]).then(function(resources) {
			
			let starMesh = new THREE.Object3D();

			let baseUniforms = {
				flow: { type: 'f', value: 0.01 },
			  	color:     { type: "c", value: new THREE.Color( Star.color ) },
			};

			Star.baseUniforms = baseUniforms;

			let baseGeometry  = new THREE.SphereBufferGeometry(Star.size, 16, 16);
			
			let baseMaterial = new THREE.ShaderMaterial({
				uniforms:       baseUniforms,
				vertexShader:   resources.shaders.get("sun-vs").program,
				fragmentShader: resources.shaders.get("sun-fs").program
			});
			let baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
			baseMesh.position.x = Star.position.x;
			baseMesh.position.y = Star.position.y;
			starMesh.add(baseMesh);
			
			//let coronaGeometry = new THREE.CircleGeometry( Star.size+(Star.size/10), 32 );
			let coronaGeometry = new THREE.CircleGeometry( 1, 64 );

			Star.coronaUniforms = {
				alpha: { type: "f", value: 5 },
				color: { type: "c", value: new THREE.Color( starColor.clone().addScalar(100) ) },
                scale: { type: "v3", value:new THREE.Vector3(Star.size+(Star.size/10),Star.size+(Star.size/8),1)}
            };

            let coronaMaterial = new THREE.ShaderMaterial( {
                uniforms: Star.coronaUniforms,
                vertexShader: resources.shaders.get("corona-vs").program,
                fragmentShader: resources.shaders.get("corona-fs").program,
                transparent: true,
                blending:THREE.AdditiveBlending

            } );
   
   			//let coronaMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
            let coronaMesh = new THREE.Mesh( coronaGeometry, coronaMaterial );

            baseMesh.add(coronaMesh);


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

			baseMesh.add(Star.raysOne);

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

			baseMesh.add(Star.raysTwo);

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
		
		Star.baseUniforms.flow.value = Star.flow;

		Star.flow +=  delta * 0.25;
		
		Star.raysOne.material.rotation = Star.flow/25;
		Star.raysTwo.material.opacity = Math.abs(Star.rayOneFade.max-Star.rayOneFade.min * Math.cos(Star.flow))+Star.rayOneFade.min;

		Star.raysTwo.material.rotation = -(Star.flow/20);
		Star.raysTwo.material.opacity = Math.abs(Star.rayTwoFade.max-Star.rayTwoFade.min * Math.cos(Star.flow))+Star.rayTwoFade.min;


	}

}