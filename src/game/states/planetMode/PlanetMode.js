
import { State } from "engine/model/State";
import { Camera } from "engine/model/Camera";
import { Keyboard } from "engine/io/Keyboard";
import { StarBox } from "game/entities/StarBox";
import { PlanetModeLights } from "game/states/planetMode/lights/PlanetModeLights";
import { Earth } from "game/states/planetMode/entities/Earth";

let PlanetMode = new State("Planet Mode");

PlanetMode.init(function() {

	console.log("PlanetMode init");

	let keyboard = PlanetMode.controls.keyboard;

	keyboard.when([Keyboard.ESC], function() {
		PlanetMode.game.setCurrentState("Main Menu");
	});

	keyboard.when([Keyboard.CTRL, keyboard.D], function() {
		PlanetMode.game.setCurrentState("Dev Mode");
	});

	keyboard.when([Keyboard.CTRL, keyboard.M], function() {
		PlanetMode.game.setCurrentState("Map Mode");
	});

});

PlanetMode.load(function() {
	
	if(PlanetMode.loaded) return;

	PlanetMode.camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	PlanetMode.lights = new PlanetModeLights();
    PlanetMode.planet = new Earth();
    PlanetMode.startfield = new StarBox();

    Promise.all([
    	PlanetMode.startfield.load(),
    	PlanetMode.planet.load()
    ]).then(function() {
    	
    	PlanetMode.camera.position.z = 1;

    	PlanetMode.scene.add(PlanetMode.planet.getMesh());
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