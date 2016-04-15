
import { State } from "engine/model/State.js";
import { Camera } from "engine/model/Camera.js";
import { MapModeLights } from "game/states/mapMode/lights/MapModeLights.js";
import { StarBox } from "game/entities/StarBox.js";
import { StarMapBg } from "game/states/mapMode/entities/StarMapBg.js";
import { StarMap } from "game/states/mapMode/entities/StarMap.js";


let MapMode = new State("Map Mode");

MapMode.init(function() {

	console.log("MapMode init");

	MapMode.renderer.clear();

	_registerControlls();
	
});

MapMode.load(function() {

	if(MapMode.loaded) return;

	MapMode.camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
	MapMode.lights = new MapModeLights();
	MapMode.starBox = new StarBox();
	MapMode.starMap = new StarMap();
	MapMode.starMapBg = new StarMapBg();
	

	Promise.all([
		MapMode.starBox.load(),
		MapMode.starMapBg.load(),
		MapMode.starMap.load()
	]).then(function() {
		MapMode.scene.add(MapMode.lights.getAmbientLight());
		let spotLight = MapMode.lights.getSpotLight();
		MapMode.scene.add(spotLight);
		MapMode.scene.add(spotLight.target);
		MapMode.scene.add(MapMode.starMapBg.getMesh());
		MapMode.scene.add(MapMode.starMap.getMesh());
		MapMode.scene.add(MapMode.starBox.getMesh());

	    MapMode.camera.position.z = 40.00;
	    //MapMode.camera.position.y = -15;
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


let _registerControlls = function() {


	MapMode.controls.keyboard.pressed([17, 80], function() {
		MapMode.game.setCurrentState("Planet Mode");
	});

	MapMode.controls.keyboard.pressed([17, 68], function() {
		MapMode.game.setCurrentState("Dev Mode");
	});

	MapMode.controls.keyboard.pressed([27], function() {
		MapMode.game.setCurrentState("Main Menu");
	});
}

export {MapMode};


