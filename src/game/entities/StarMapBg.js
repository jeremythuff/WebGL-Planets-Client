import { THREE } from 'three';
import { AssetLoader } from "./../../engine/utils/AssetLoader.js"
import { Texture } from "./../../engine/model/Texture.js"
import { Shader } from "./../../engine/model/Shader.js"


let assetLoader = new AssetLoader();

export class StarMapBg {
	constructor() {
		let StarMapBg = this;
		StarMapBg.loaded = false;
		StarMapBg._mesh = null;
		StarMapBg._rockLeft = true;

	}

	load() {

		let StarMapBg = this;

		let loadPromise = assetLoader.loadAll([
			new Texture("src/game/resources/textures/spiral-galaxy.png"),		
			new Texture("src/game/resources/textures/glowSpan.png"),
			new Texture("src/game/resources/textures/bg-light.png"),
			new Shader("src/game/resources/shaders/galaxy-spiral.fs.glsl"),		
			new Shader("src/game/resources/shaders/galaxy-spiral.vs.glsl")
		]).then(function(resources) {

			StarMapBg._mesh = new THREE.Object3D();

			StarMapBg.nebulaMesh = drawNebula(StarMapBg._mesh, resources);
			StarMapBg.gridMesh = drawSquareGuide(StarMapBg._mesh, resources);
			StarMapBg.galaxyMesh = drawGalaxy(StarMapBg._mesh, resources);

			StarMapBg.loaded = true;

		});

		return loadPromise;

	}

	update(delta) {

		let StarMapBg = this;
		if(!StarMapBg.loaded) return;
		
		StarMapBg.nebulaMesh.rotation.z  += 1/120 * delta;

		let rockSpeed = 1/200 * delta;
		let rockDistance = 0.01;

		if(StarMapBg._rockLeft) {
			StarMapBg.galaxyMesh.rotation.y += rockSpeed;
			if(StarMapBg.galaxyMesh.rotation.y >= rockDistance) {
				StarMapBg.galaxyMesh.rotation.y = rockDistance;
				StarMapBg._rockLeft = false;	
			}
		} else {
			StarMapBg.galaxyMesh.rotation.y -= rockSpeed;	
			if(StarMapBg.galaxyMesh.rotation.y <= -rockDistance) {
				StarMapBg.galaxyMesh.rotation.y = -rockDistance;
				StarMapBg._rockLeft = true;	
			}
		}
		
		let attributes = StarMapBg.galaxyMesh.geometry.attributes;
		let halfTheStars = attributes.size.array.length/2;
		for ( let i = halfTheStars; i < halfTheStars; i++ ) {
			let twinkleBase = 0.05; 
			let twinkle = twinkleBase*(Math.floor(Math.random()*2) == 1 ? 1 : -1);
			attributes.size.array[i] += twinkle;
			if(attributes.size.array[i] <= 0) attributes.size.array[i] += twinkleBase;
			if(attributes.size.array[i] >= 5) attributes.size.array[i] -= twinkleBase;
			
		}

		attributes.size.needsUpdate = true;
	
	}

	getMesh() {
		return this._mesh;
	}

}

let drawNebula = function(mesh, resources) {

	let nebulaGeometry = new THREE.PlaneGeometry(180, 180, 1, 1);
	let nebulaMaterial  = new THREE.MeshPhongMaterial({
		transparent: true, 
		opacity: 0.35,
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
		wireframe: true,
		opacity: 0.35,
	});

	let gridMaterialDark = new THREE.MeshBasicMaterial({
		color: 0x247f91,
		transparent: true,
		depthTest: true,
		depthWrite: false,		
		wireframe: true,
		opacity: 0.1,
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

	gridMeshUnder.add(gridMesh);
	mesh.add(gridMeshUnder);

	return gridMesh;

}

let drawGalaxy = function(mesh, resources) {
	// Galaxy properties

	let uniforms = {
		color:     { type: "c", value: new THREE.Color( 0xffffff ) },
		texture:   { type: "t", value: resources.textures.get("bg-light") },
		alpha:     { type: "f", value: 0.25 }
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
		depthTest:      true,
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