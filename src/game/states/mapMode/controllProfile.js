import { THREE } from 'three';
import { Keyboard } from "engine/io/Keyboard";
import { Mouse } from "engine/io/Mouse";

let loadControllProfile = function(MapMode) {

	let keyboard = MapMode.controls.keyboard;
	let mouse = MapMode.controls.mouse;

	MapMode.minZoom = 40;
	MapMode.maxZoom = 2;
	MapMode.zoomLevel = 0;
	MapMode.panX = 0;
	MapMode.panY = 0;
	MapMode.offsetX = 0;
	MapMode.offsetY = 0;

	keyboard.when([Keyboard.CTRL, keyboard.P], function() {
		MapMode.game.setCurrentState("Planet Mode");
	});

	keyboard.when([Keyboard.CTRL, keyboard.D], function() {
		MapMode.game.setCurrentState("Dev Mode");
	});

	keyboard.when([Keyboard.ESC], function() {
		MapMode.game.setCurrentState("Main Menu");
	});

	mouse.when([Mouse.LEFTCLICK, Mouse.MOVE],function(mouse, e) {

		let panFactorX = mouse.position.get("deltaX")/10;
		let panFactorY = mouse.position.get("deltaY")/10;

		MapMode.panX+=panFactorX;
		MapMode.panY+=panFactorY;

		MapMode.offsetX+=panFactorX;
		MapMode.offsetY+=panFactorY;

	});

	mouse.when([Mouse.SCROLL], function(mouse, e) {
		let zoomLevel = 1;
		let zoomRange = MapMode.maxZoom - MapMode.minZoom;
		MapMode.zoomLevel = Number(((MapMode.camera.position.z-MapMode.minZoom)/zoomRange).toFixed(2));
	});


}

export {loadControllProfile}
