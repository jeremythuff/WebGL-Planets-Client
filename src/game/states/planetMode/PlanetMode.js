import { THREE } from 'three';
import { State } from "engine/model/State";
import { Camera } from "engine/model/Camera";
import { Keyboard } from "engine/io/Keyboard";
import { StarBox } from "game/entities/StarBox";
import { Star } from "game/entities/Star";
//import { PlanetModeLights } from "game/states/planetMode/lights/PlanetModeLights";
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

    var starColor = new THREE.Color( 0xff8c00 );
	PlanetMode.camera = new Camera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	PlanetMode.star = new Star(starColor.clone().getHex(), 1, {x: -10, y: 6, z: -20});

    PlanetMode.starLight = new THREE.PointLight( starColor.clone().addScalar(0.5), 5, 100 );
    PlanetMode.planet = new Earth();
    PlanetMode.startfield = new StarBox();

    Promise.all([
    	PlanetMode.startfield.load(),
    	PlanetMode.planet.load(),
        PlanetMode.star.load()
    ]).then(function() {
    	
    	PlanetMode.camera.position.z = 2;

        PlanetMode.planet.getMesh().add(PlanetMode.starLight);

        var directionalLight = new THREE.DirectionalLight( starColor.clone().addScalar(1.5), 0.5 );
        directionalLight.position.set(-5, 2, 2);
        PlanetMode.planet.getMesh().add(directionalLight);

        PlanetMode.scene.add(PlanetMode.star.getMesh());
    	PlanetMode.scene.add(PlanetMode.planet.getMesh());
    	PlanetMode.scene.add(PlanetMode.startfield.getMesh());
    	
    	console.log(PlanetMode);
    	console.log("PlanetMode load");

    });

});

PlanetMode.update(function(delta) {
	PlanetMode.planet.update(delta);
    PlanetMode.star.update(delta);
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