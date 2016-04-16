
import { State } from "engine/model/State";
import { Camera } from "engine/model/Camera";
import { MapModeLights } from "game/states/mapMode/lights/MapModeLights";
import { StarBox } from "game/entities/StarBox";
import { StarMapBg } from "game/states/mapMode/entities/StarMapBg";
import { StarMap } from "game/states/mapMode/entities/StarMap";
import { mapModeControlls } from "game/states/mapMode/mapModeControlls";


let MapMode = new State("Map Mode");

MapMode.init(function() {

	console.log("MapMode init");

	MapMode.renderer.clear();

	mapModeControlls(MapMode);
	
});

MapMode.load(function() {

	if(MapMode.loaded) return;

	MapMode.minZoom = 40;
	MapMode.maxZoom = 5;
	MapMode.offsetX = 0;
	MapMode.offsetY = 0;

	MapMode.camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	MapMode.zoomLevel = function() {
		let zoomLevel = 1;
		let zoomRange = MapMode.maxZoom - MapMode.minZoom;
		zoomLevel = (MapMode.camera.position.z-MapMode.minZoom)/zoomRange;
		return zoomLevel;
	}

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

	    MapMode.camera.position.z = MapMode.minZoom;
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


