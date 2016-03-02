import { AssetLoader } from "./../../engine/utils/AssetLoader.js"
import { Texture } from "./../../engine/model/Texture.js"
import { Shader } from "./../../engine/model/Shader.js"


let assetLoader = new AssetLoader();

export class StarMap {
	constructor() {
		let StarMap = this;
		StarMap.loaded = false;
		StarMap.mesh = null;
		StarMap.rockLeft = true;

	}

	load() {

		let StarMap = this;

		let loadPromise = assetLoader.loadAll([
			new Texture("src/game/resources/textures/spiral-galaxy.png"),		
			new Texture("src/game/resources/textures/glowSpan.png"),
			new Texture("src/game/resources/textures/bg-light.png"),
			new Shader("src/game/resources/shaders/galaxy-spiral.fs.glsl"),		
			new Shader("src/game/resources/shaders/galaxy-spiral.vs.glsl")
		]).then(function(resources) {

			StarMap.mesh = new THREE.Object3D();

			StarMap.nebulaMesh = drawNebula(StarMap.mesh, resources);
			StarMap.gridMesh = drawSquareGuide(StarMap.mesh, resources);
			StarMap.galaxyMesh = drawGalaxy(StarMap.mesh, resources);

			StarMap.loaded = true;

		});

		return loadPromise;

	}

	update(delta) {

		let StarMap = this;
		if(!StarMap.loaded) return;
		
		StarMap.nebulaMesh.rotation.z  += 1/120 * delta;

		let rockSpeed = 1/200 * delta;
		let rockDistance = 0.01;

		if(StarMap.rockLeft) {
			StarMap.galaxyMesh.rotation.y += rockSpeed;
			if(StarMap.galaxyMesh.rotation.y >= rockDistance) {
				StarMap.galaxyMesh.rotation.y = rockDistance;
				StarMap.rockLeft = false;	
			}
		} else {
			StarMap.galaxyMesh.rotation.y -= rockSpeed;	
			if(StarMap.galaxyMesh.rotation.y <= -rockDistance) {
				StarMap.galaxyMesh.rotation.y = -rockDistance;
				StarMap.rockLeft = true;	
			}
		}
		
		let attributes = StarMap.galaxyMesh.geometry.attributes;

		for ( let i = 0; i < attributes.size.array.length; i++ ) {
			if(Math.random() > 0.9999)
			attributes.size.array[i] = attributes.size.array[i]*rand();;
		}

		attributes.size.needsUpdate = true;
	
	}

	getMesh() {
		return this.mesh;
	}

}

let drawNebula = function(mesh, resources) {

	let nebulaGeometry = new THREE.PlaneGeometry(180, 180, 1, 1);
	let nebulaMaterial  = new THREE.MeshPhongMaterial({
		transparent: true, 
		opacity: 0.5,
		map: resources.textures.get("spiral-galaxy")
	});
	
	let nebulaMesh = new THREE.Mesh( nebulaGeometry, nebulaMaterial );

	mesh.add(nebulaMesh);

	return nebulaMesh;
}

let drawSquareGuide = function(mesh, resources) {

	let gridGeometry = new THREE.PlaneGeometry( 50, 50, 20, 20);
	let gridMaterial = new THREE.MeshBasicMaterial({
		map: resources.textures.get("glowSpan"),
		blending: THREE.AdditiveBlending,
		transparent: true,
		depthTest: false,
		depthWrite: false,		
		wireframe: true,
		opacity: 0.25,
	});

	let gridMaterialDark = new THREE.MeshBasicMaterial({
		transparent: true,
		depthTest: false,
		depthWrite: false,		
		wireframe: true,
		opacity: 0.025,
	});

	let gridMesh = new THREE.Mesh( gridGeometry, gridMaterial );
	let gridMeshUnder = new THREE.Mesh( gridGeometry, gridMaterialDark );

	gridMesh.position.z = 0.2;			
	gridMeshUnder.position.z = 0.1;

	gridMesh.material.map.wrapS = THREE.RepeatWrapping;
	gridMesh.material.map.wrapT = THREE.RepeatWrapping;
	gridMesh.material.map.needsUpdate = true;
	gridMesh.material.map.onUpdate = function(){
		this.offset.y += 0.0025;
		this.needsUpdate = true;
	}

	gridMesh.add(gridMeshUnder);
	mesh.add(gridMesh);

	return gridMesh;

}

let drawGalaxy = function(mesh, resources) {
	// Galaxy properties

	let uniforms = {
		color:     { type: "c", value: new THREE.Color( 0xffffff ) },
		texture:   { type: "t", value: resources.textures.get("bg-light") },
		alpha:     { type: "f", value: 0.35 }
	};

	let galaxy = new THREE.BufferGeometry();

	let starsPerArm = 1250;
	let arms = 10;
	let armAngle = 100 / arms;


	uniforms.texture.value.wrapS = uniforms.texture.value.wrapT = THREE.RepeatWrapping;

	// Create the galaxy structure
	let c3 = 0;
	let c = 0;

	let positions = new Float32Array( starsPerArm * arms * 3 );
	let colors = new Float32Array( starsPerArm * arms * 3 );
	let sizes = new Float32Array( starsPerArm * arms );

	let color = new THREE.Color( 0x555555 );

	for (let arm = 0; arm < arms; arm++) {
		for (let i = 0; i <= starsPerArm; i++) {
			let radius = i / 40;
			let angle = i / 100 + (armAngle * (arm + 1));
			let y = radius * Math.cos(angle) + rand();
			let x = radius * Math.sin(angle) + rand();
			let z = rand() / 5;
			// Add stars

			positions[c3+0] = x + rand();
			positions[c3+1] = y + rand();
			positions[c3+2] = z + rand();

			let starType = rand();

			colors[c3+0] = color.r + starType;
			colors[c3+1] = color.g + starType;
			colors[c3+2] = color.b + starType;

			sizes[c] = 5*rand();

			c3+=3;
			c++;
		}
	}

	galaxy.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	galaxy.addAttribute( 'ca', new THREE.BufferAttribute( colors, 3 ) );
	galaxy.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

	let shaderMaterial = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: resources.shaders.get("galaxy-spiral-vs").program,
		fragmentShader: resources.shaders.get("galaxy-spiral-fs").program,
		blending:       THREE.AdditiveBlending,
		depthTest:      false,
		transparent: true
	});

	// Create the particle system
	let particleSystem = new THREE.Points(galaxy, shaderMaterial);
	particleSystem.sortParticles = true;
	particleSystem.position.z = 0.5;

	mesh.add(particleSystem);

	return particleSystem;

}

let rand = function() {
	return Math.random() - 0.5;
}