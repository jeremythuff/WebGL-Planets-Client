import { THREE } from 'three';

let loadControllProfile = function(MapMode) {

	let keyboard = MapMode.controls.keyboard;
	let mouse = MapMode.controls.mouse;

	MapMode.minZoom = 40;
	MapMode.maxZoom = 5;
	MapMode.zoomLevel = 0;
	MapMode.panX = 0;
	MapMode.panY = 0;
	MapMode.offsetX = 0;
	MapMode.offsetY = 0;

	keyboard.when([keyboard.CTRL, keyboard.P], function() {
		MapMode.game.setCurrentState("Planet Mode");
	});

	keyboard.when([keyboard.CTRL, keyboard.D], function() {
		MapMode.game.setCurrentState("Dev Mode");
	});

	keyboard.when([keyboard.ESC], function() {
		MapMode.game.setCurrentState("Main Menu");
	});

	mouse.when([mouse.LEFTCLICK, mouse.MOVE],function(mouse, e) {

		let panFactorX = mouse.position.get("deltaX")/10;
		let panFactorY = mouse.position.get("deltaY")/10;

		MapMode.panX+=panFactorX;
		MapMode.panY+=panFactorY;

		MapMode.offsetX+=panFactorX;
		MapMode.offsetY+=panFactorY;

	});

	mouse.when([mouse.SCROLL], function(mouse, e) {
		let zoomLevel = 1;
		let zoomRange = MapMode.maxZoom - MapMode.minZoom;
		MapMode.zoomLevel = Number(((MapMode.camera.position.z-MapMode.minZoom)/zoomRange).toFixed(2));
	});


}

export {loadControllProfile}
