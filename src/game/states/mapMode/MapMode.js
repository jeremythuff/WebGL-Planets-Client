
import { State } from "engine/model/State";
import { Camera } from "engine/model/Camera";
import { MapModeLights } from "game/states/mapMode/lights/MapModeLights";
import { StarBox } from "game/entities/StarBox";
import { StarMapBg } from "game/states/mapMode/entities/StarMapBg";
import { StarMap } from "game/states/mapMode/entities/StarMap";
import { loadControllProfile } from "game/states/mapMode/controllProfile";

let MapMode = new State("Map Mode");

MapMode.init(function() {

	console.log("MapMode init");

	MapMode.renderer.clear();

	loadControllProfile(MapMode);
	
});

MapMode.load(function() {

	if(MapMode.loaded) return;

	MapMode.camera = new Camera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

	MapMode.lights = new MapModeLights();
	MapMode.starBox = new StarBox();
	MapMode.starMap = new StarMap();
	MapMode.starMapBg = new StarMapBg();
	

	Promise.all([
		MapMode.starMap.load(),
		MapMode.starBox.load(),
		MapMode.starMapBg.load()
	]).then(function() {
		MapMode.scene.add(MapMode.lights.getAmbientLight());
		let spotLight = MapMode.lights.getSpotLight();
		MapMode.scene.add(spotLight);
		MapMode.scene.add(spotLight.target);
		MapMode.scene.add(MapMode.starMapBg.getMesh());
		MapMode.scene.add(MapMode.starMap.getMesh());
		MapMode.scene.add(MapMode.starBox.getMesh());

	    MapMode.camera.position.z = MapMode.minZoom;
	 	MapMode.camera.lookAt(MapMode.starMapBg.getMesh().position);

	    console.log(MapMode);
		console.log("MapMode loaded");

	});

	MapMode.context.menuBar = {
		mainMenuBtn: {
			action: function(e) {
				MapMode.game.setCurrentState("Main Menu");
			}
		}
	};
	
	MapMode.gui.addView("Menu Bar", "src/game/states/mapMode/gui/templates/menuBar.hbs");

});

MapMode.update(function(delta) {
	MapMode.starMap.update(delta);
	MapMode.starMapBg.update(delta, MapMode);
});

MapMode.render(function(delta) {
	MapMode.renderer.render(MapMode.scene, MapMode.camera);
});

MapMode.close(function() {
	MapMode.gui.close();
	console.log("MapMode close");
});

MapMode.destroy(function() {
	console.log("MapMode destroy");
});

export {MapMode};


