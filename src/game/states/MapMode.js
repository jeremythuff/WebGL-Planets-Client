
import { State } from "./../../engine/model/State.js";
import { Camera } from "./../../engine/model/Camera.js";
import { MapModeLights } from "./../lights/MapModeLights.js";
import { Starfield } from "./../entities/Starfield.js";
import { StarMap } from "./../entities/StarMap.js";

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
	MapMode.lights = new MapModeLights();
	MapMode.starMap = new StarMap();
	MapMode.startfield = new Starfield();

	Promise.all([
		MapMode.startfield.load(),
		MapMode.starMap.load()
	]).then(function() {
		MapMode.scene.add(MapMode.lights.getAmbientLight());
		MapMode.scene.add(MapMode.starMap.getMesh());
		MapMode.scene.add(MapMode.startfield.getMesh());

	    MapMode.camera.position.z = 100;
	    MapMode.camera.lookAt(MapMode.starMap.getMesh().position);

	    console.log(MapMode);
		console.log("MapMode loaded");

	});

});

MapMode.update(function(delta) {
	MapMode.starMap.update(delta);
});

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