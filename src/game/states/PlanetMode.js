
import { State } from "./../../engine/model/State.js";
import { Camera } from "./../../engine/model/Camera.js";
import { Starfield } from "./../entities/Starfield.js";
import { PlanetModeLights } from "./../lights/PlanetModeLights.js";
import { Earth } from "./../entities/Earth.js";

let PlanetMode = new State("Planet Mode");

PlanetMode.init(function() {

	console.log("PlanetMode init");

	PlanetMode.controls.keyboard.pressed([27], function() {
		PlanetMode.game.setCurrentState("Main Menu");
	});

	PlanetMode.controls.keyboard.pressed([17, 66], function() {
		PlanetMode.game.setCurrentState("Map Mode");
	});

});

PlanetMode.load(function() {
	
	if(PlanetMode.loaded) return;

	PlanetMode.camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
	PlanetMode.lights = new PlanetModeLights();
    PlanetMode.planet = new Earth();
    PlanetMode.startfield = new Starfield();

    Promise.all([
    	PlanetMode.startfield.load(),
    	PlanetMode.planet.load()
    ]).then(function() {
    	
    	PlanetMode.camera.position.z = 1;

    	PlanetMode.scene.add(PlanetMode.planet.mesh);
    	PlanetMode.scene.add(PlanetMode.startfield.getMesh());
    	PlanetMode.scene.add(PlanetMode.lights.getSpotlight());
    	
    	console.log(PlanetMode);
    	console.log("PlanetMode load");

    });

});

PlanetMode.update(function(delta) {
	PlanetMode.planet.update(delta);
});

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