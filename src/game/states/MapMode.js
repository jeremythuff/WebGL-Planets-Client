
import { State } from "./../../engine/model/State.js";
import { Camera } from "./../../engine/model/Camera.js";
import { MapModeLights } from "./../lights/MapModeLights.js";
import { StarBox } from "./../entities/StarBox.js";
import { StarMapBg } from "./../entities/StarMapBg.js";

let MapMode = new State("Map Mode");

MapMode.init(function() {

	console.log("MapMode init");

	MapMode.renderer.clear();

	MapMode.controls.keyboard.pressed([17, 80], function() {
		MapMode.game.setCurrentState("Planet Mode");
	});

	MapMode.controls.keyboard.pressed([17, 83], function() {
		MapMode.game.setCurrentState("Star Mode");
	});

	MapMode.controls.keyboard.pressed([27], function() {
		MapMode.game.setCurrentState("Main Menu");
	});
	
});

MapMode.load(function() {

	if(MapMode.loaded) return;

	MapMode.camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
	MapMode.lights = new MapModeLights();
	MapMode.starMapBg = new StarMapBg();
	MapMode.startBox = new StarBox();

	Promise.all([
		MapMode.startBox.load(),
		MapMode.starMapBg.load()
	]).then(function() {
		MapMode.scene.add(MapMode.lights.getAmbientLight());
		MapMode.scene.add(MapMode.starMapBg.getMesh());
		MapMode.scene.add(MapMode.startBox.getMesh());

	    MapMode.camera.position.z = 40.00;
	    MapMode.camera.position.y = -15;
	    MapMode.camera.lookAt(MapMode.starMapBg.getMesh().position);

	    console.log(MapMode);
		console.log("MapMode loaded");

	});

});

MapMode.update(function(delta) {
	MapMode.starMapBg.update(delta);
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