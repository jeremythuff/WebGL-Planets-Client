
import { State } from "engine/model/State.js";

let DevMode = new State("Dev Mode");

DevMode.init(function() {
	
	console.log("DevMode init");
	console.log(DevMode);

	let keyboard = DevMode.controls.keyboard;

	keyboard.when([keyboard.ESC], function() {
		DevMode.game.setCurrentState("Main Menu");
	});

	keyboard.when([keyboard.CTRL, keyboard.M], function() {
		DevMode.game.setCurrentState("Map Mode");
	});

	keyboard.when([keyboard.CTRL, keyboard.P], function() {
		DevMode.game.setCurrentState("Planet Mode");
	});

});

DevMode.load(function() {
	if(DevMode.loaded) return;
	console.log("DevMode loaded");
});

DevMode.update(function(delta) {});

DevMode.render(function(delta) {});

DevMode.close(function() {
	console.log("DevMode close");
});

DevMode.destroy(function() {
	console.log("DevMode destroy");
});

export {DevMode};