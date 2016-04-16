import { THREE } from 'three';

let mapModeControlls = function(MapMode) {

	let keyboard = MapMode.controls.keyboard;
	let mouse = MapMode.controls.mouse;

	keyboard.when([keyboard.CTRL, keyboard.P], function() {
		MapMode.game.setCurrentState("Planet Mode");
	});

	keyboard.when([keyboard.CTRL, keyboard.D], function() {
		MapMode.game.setCurrentState("Dev Mode");
	});

	keyboard.when([keyboard.ESC], function() {
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

export {mapModeControlls}