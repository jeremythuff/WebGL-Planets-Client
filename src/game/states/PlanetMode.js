
import { State } from "./../../engine/model/State.js";
import { Camera } from "./../../engine/model/Camera.js";
import { PlanetModeLights } from "./../lights/PlanetModeLights.js";
import { Planet } from "./../entities/Planet.js";

let PlanetMode = new State("Planet Mode");

PlanetMode.init(function() {

	PlanetMode.controls.keyboard.pressed([27], function() {
		PlanetMode.game.setCurrentState("Main Menu");
	});

	console.log("PlanetMode init");
	console.log(PlanetMode);

});

PlanetMode.load(function() {
	if(PlanetMode.loaded) return;

	PlanetMode.camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

	PlanetMode.lights = new PlanetModeLights(PlanetMode.scene);

    let planet = new Planet();
	
	PlanetMode.scene.add(planet.getMesh());
	
	PlanetMode.camera.position.z = 1;

	console.log("PlanetMode load");
});

PlanetMode.update(function(delta) {});

PlanetMode.render(function(delta) {
	PlanetMode.renderer.render(PlanetMode.scene, PlanetMode.camera);
});

PlanetMode.close(function() {
	console.log("PlanetMode close");
});

PlanetMode.destroy(function() {
	console.log("PlanetMode destroy");
});

export {PlanetMode};