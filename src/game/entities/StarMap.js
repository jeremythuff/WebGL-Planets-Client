import { AssetLoader } from "./../../engine/utils/AssetLoader.js"
import { Texture } from "./../../engine/model/Texture.js"
import { Shader } from "./../../engine/model/Shader.js"


let assetLoader = new AssetLoader();

export class StarMap {
	constructor() {
		let StarMap = this;
		StarMap.loaded = false;
		StarMap.mesh = null;
		StarMap.spin = "left";
	}

	load() {

		let StarMap = this;

		let loadPromise = assetLoader.loadAll([
			new Texture("src/game/resources/textures/spiral-galaxy.png"),		
			new Texture("src/game/resources/textures/glowSpan.png"),
			new Shader("src/engine/resources/shaders/default.fs.glsl"),		
			new Shader("src/engine/resources/shaders/default.vs.glsl")
		]).then(function(resources) {

			StarMap.mesh = new THREE.Object3D();

			StarMap.nebulaMesh = drawNebula(StarMap.mesh, resources);
			drawCircleGuide(StarMap.mesh, resources);
			//drawSquareGuide(StarMap.mesh, resources);
			StarMap.galaxyMesh = drawGalaxy(StarMap.mesh, resources);

			StarMap.loaded = true;

		});

		return loadPromise;

	}

	update(delta) {
		let StarMap = this;
		if(!StarMap.loaded) return;
		
		if(StarMap.getMesh().rotation.z > 0.025)
			StarMap.spin = "left"

		if(StarMap.getMesh().rotation.z < -0.025)
			StarMap.spin = "right"
			
		if(StarMap.spin == "right") StarMap.nebulaMesh.rotation.z  += 1/120 * delta;
		if(StarMap.spin == "left") StarMap.nebulaMesh.rotation.z  -= 1/120 * delta;
	
	}

	getMesh() {
		return this.mesh;
	}

}

let drawNebula = function(mesh, resources) {

	let nebulaGeometry = new THREE.PlaneGeometry(180, 180, 1, 1);
	let nebulaMaterial  = new THREE.MeshPhongMaterial({
		transparent: true, 
		opacity: 0.45,
		map: resources.textures.get("spiral-galaxy")
	});
	
	let nebulaMesh = new THREE.Mesh( nebulaGeometry, nebulaMaterial );

	mesh.add(nebulaMesh);

	return nebulaMesh;
}


let drawCircleGuide = function(mesh, resources) {

	let cylinerGeometry = new THREE.CylinderGeometry( 5, 90, 0, (360/8) - 1, 100);
	//let cylinerGeometry = new THREE.PlaneGeometry( 50, 50, 20, 20);
	let cylinderMaterial = new THREE.MeshBasicMaterial({
		map: resources.textures.get("glowSpan"),
		blending: THREE.AdditiveBlending,
		transparent: true,
		depthTest: false,
		depthWrite: false,		
		wireframe: true,
		opacity: 0.25,
	});

	let cylinderMaterialDark = new THREE.MeshBasicMaterial({
		transparent: true,
		depthTest: false,
		depthWrite: false,		
		wireframe: true,
		opacity: 0.015,
	});

	let cylinderMesh = new THREE.Mesh( cylinerGeometry, cylinderMaterial );
	let cylinderMeshUnder = new THREE.Mesh( cylinerGeometry, cylinderMaterialDark );

	cylinderMesh.position.z = 0.2;			
	cylinderMeshUnder.position.z = 0.1;

	cylinderMesh.rotation.x = Math.PI / 2;
	cylinderMeshUnder.rotation.x = Math.PI / 2;


	cylinderMesh.material.map.wrapS = THREE.RepeatWrapping;
	cylinderMesh.material.map.wrapT = THREE.RepeatWrapping;
	cylinderMesh.material.map.needsUpdate = true;
	cylinderMesh.material.map.onUpdate = function(){
		this.offset.y += 0.0025;
		this.needsUpdate = true;
	}

	mesh.add(cylinderMesh);
	mesh.add(cylinderMeshUnder);

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
		opacity: 0.5,
	});

	let gridMaterialDark = new THREE.MeshBasicMaterial({
		transparent: true,
		depthTest: false,
		depthWrite: false,		
		wireframe: true,
		opacity: 0.05,
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

	mesh.add(gridMesh);
	mesh.add(gridMeshUnder);

}

let drawGalaxy = function(mesh, resources) {
	// Galaxy properties
	let attributes = {
		size: {	type: 'f', value: [] },
		ca:   {	type: 'c', value: [] }
	};

	let uniforms = {
		amplitude: { type: "f", value: 1.0 },
		color:     { type: "c", value: new THREE.Color( 0xffffff ) },
		texture:   { type: "t", value: new THREE.Texture(generateCircleTexture()) },
	};

	// let galaxy = new THREE.BufferGeometry({
	// 	attributes: attributes
	// });

	let galaxy = new THREE.Geometry();

	let starsPerArm = 1250;
	let arms = 10;
	let armAngle = 100 / arms;


	uniforms.texture.value.wrapS = uniforms.texture.value.wrapT = THREE.RepeatWrapping;

	// Create the galaxy structure
	for (let arm = 0; arm < arms; arm++) {
		for (let i = 0; i <= starsPerArm; i++) {
			let radius = i / 40;
			let angle = i / 100 + (armAngle * (arm + 1));
			let x = radius * Math.cos(angle) + rand();
			let y = rand() / 5;
			let z = radius * Math.sin(angle) + rand();
			// Add stars
			let randResult = Math.random() * (starsPerArm);
			if(randResult < i*i) {
				galaxy.vertices.push(new THREE.Vector3(x + rand(), y + rand(), z + rand()));
			}
			// Add about 50% more stars with some position variation for a better result
			galaxy.vertices.push(new THREE.Vector3(x, y, z));
			if(rand() >= 0) {
				galaxy.vertices.push(new THREE.Vector3(x + rand(), y + rand(), z + rand()));
			}
		}
	}

	let shaderMaterial = new THREE.PointsMaterial({size: 0.25, transparent: true, opacity: 0.5});

	// let shaderMaterial = new THREE.ShaderMaterial( {
	// 	uniforms: 		uniforms,
	// 	vertexShader:   resources.shaders.get("default-vs"),
	// 	fragmentShader: resources.shaders.get("default-fs"),
	// 	transparent:	true
	// });

	// Create the particle system
	let particleSystem = new THREE.Points(galaxy, shaderMaterial);
	particleSystem.sortParticles = true;
	particleSystem.position.z = -0.5;
	particleSystem.rotation.x = Math.PI / 2;
	
	// Data to send to the shader
	let vertices = particleSystem.geometry.vertices;
	let values_size = attributes.size.value;
	let values_color = attributes.ca.value;
	console.log("vertices = " + vertices.length);
	// Color variation
	for( var v = 0; v < vertices.length; v++ ) {
		values_size[ v ] = 0.2 + rand();
		values_color[ v ] = new THREE.Color( 0xffffff );
		let starType = Math.random();
		values_color[ v ].setRGB(1, 1, 1);
	}
	// Add the particle system to the scene
	mesh.add(particleSystem);

	return particleSystem;

}

function generateCircleTexture() {
	// draw a circle in the center of the canvas
	var size = 64;
	// create canvas
	var canvas = document.createElement('canvas');
	canvas.width = size;
	canvas.height = size;
	// get context
	var context = canvas.getContext('2d');
	// draw circle
	var centerX = size / 2;
	var centerY = size / 2;
	var radius = size / 2;
	for(var i = 1; i < 33; i++) {
		context.beginPath();
		context.arc(centerX, centerY, (radius / 2) + (i / 2), 0, 2 * Math.PI, false);
		context.fillStyle = "rgba(255, 255, 255, " + (1 / i) + ")";
		context.fill();
	}
	return canvas;
}


let rand = function() {
	return Math.random() - 0.5;
}