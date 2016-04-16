
import { THREE } from 'three';
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

	    MapMode.camera.position.z = 40.00;
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

	let keyboard = MapMode.controls.keyboard;
	let mouse = MapMode.controls.mouse;

	keyboard.when([17, 80], function() {
		MapMode.game.setCurrentState("Planet Mode");
	});

	keyboard.when([17, 68], function() {
		MapMode.game.setCurrentState("Dev Mode");
	});

	keyboard.when([27], function() {
		MapMode.game.setCurrentState("Main Menu");
	});

	mouse.when([mouse.SCROLLUP],function(mouse, e) {

		let zoomFactor = mouse.scroll.get("deltaY")/100;
		let tiltFactor = zoomFactor/8;

		if(MapMode.camera.position.z+zoomFactor>MapMode.minZoom) return;
		
		MapMode.camera.position.z += zoomFactor;
		MapMode.camera.position.y += tiltFactor;

		let offsetCenter = new THREE.Vector3( MapMode.starMapBg.getMesh().position.x+MapMode.offsetX, MapMode.starMapBg.getMesh().position.y+MapMode.offsetY, MapMode.starMapBg.getMesh().position.z );
	 	
	 	MapMode.camera.lookAt(offsetCenter);

	 	MapMode.starMapBg.galaxyMesh.material.uniforms.alpha.value = MapMode.starMapBg.galaxyMesh.originalOpacity*(1-MapMode.zoomLevel());

	 	console.log(MapMode.zoomLevel());

	});

	mouse.when([mouse.SCROLLDOWN],function(mouse, e) {

		let zoomFactor = mouse.scroll.get("deltaY")/100;
		let tiltFactor = zoomFactor/8;
		
		if(MapMode.camera.position.z+zoomFactor<MapMode.maxZoom) return;
		
		MapMode.camera.position.z += zoomFactor;
		MapMode.camera.position.y += tiltFactor;

		let offsetCenter = new THREE.Vector3( MapMode.starMapBg.getMesh().position.x+MapMode.offsetX, MapMode.starMapBg.getMesh().position.y+MapMode.offsetY, MapMode.starMapBg.getMesh().position.z );
	 	
	 	MapMode.camera.lookAt(offsetCenter);

	 	MapMode.starMapBg.galaxyMesh.material.uniforms.alpha.value = MapMode.starMapBg.galaxyMesh.originalOpacity*(1-MapMode.zoomLevel());

	 	console.log(MapMode.zoomLevel());
	
	});

	mouse.when([mouse.LEFTCLICK, mouse.MOVE],function(mouse, e) {

		let panFactorX = mouse.position.get("deltaX")/10;
		let panFactorY = mouse.position.get("deltaY")/10;

		MapMode.camera.position.y += panFactorY;
		MapMode.camera.position.x += panFactorX;

		MapMode.offsetX+=panFactorX;
		MapMode.offsetY+=panFactorY;


	});


}

export {MapMode};


