
import { State } from "./../../engine/model/State.js";
import { Camera } from "./../../engine/model/Camera.js";
import { PlanetModeLights } from "./../lights/PlanetModeLights.js";
import { Starfield } from "./../entities/Starfield.js";

let MapMode = new State("Map Mode");


MapMode.init(function() {

	console.log("MapMode init");

	MapMode.renderer.clear();

	MapMode.controls.keyboard.pressed([13], function() {
		MapMode.game.setCurrentState("Planet Mode");
	});

	MapMode.controls.keyboard.pressed([27], function() {
		MapMode.game.setCurrentState("Main Menu");
	});
	
});

MapMode.load(function() {
	if(MapMode.loaded) return;

	MapMode.camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
	MapMode.startfield = new Starfield();
	MapMode.lights = new PlanetModeLights();


	let planeGeometry = new THREE.PlaneGeometry(180, 120, 1, 1);
	let material  = new THREE.MeshPhongMaterial({transparent: true, opacity: 0.5});
	material.map    = THREE.ImageUtils.loadTexture('src/game/resources/textures/spiral-galaxy.png');
	let plane = new THREE.Mesh( planeGeometry, material );

	plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;

    MapMode.camera.position.x = -30;
    MapMode.camera.position.y = 80;
    MapMode.camera.position.z = 10;
    MapMode.camera.lookAt(plane.position);

	MapMode.scene.add(plane);
 	MapMode.scene.add(MapMode.lights.getAmbientLight()); 
	MapMode.scene.add(MapMode.startfield.getMesh());



	console.log("MapMode loaded");
});

MapMode.update(function(delta) {});

MapMode.render(function(delta) {
	MapMode.renderer.render(MapMode.scene, MapMode.camera);
});

MapMode.close(function() {
	console.log("MapMode close");
});

MapMode.destroy(function() {
	console.log("MapMode destroy");
});

export {MapMode};