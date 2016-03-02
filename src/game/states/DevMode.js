
import { State } from "./../../engine/model/State.js";

let DevMode = new State("Dev Mode");

DevMode.init(function() {
	
	console.log("DevMode init");
	console.log(DevMode);

	DevMode.controls.keyboard.pressed([13], function() {
		DevMode.game.setCurrentState("Main Menu");
	});

	DevMode.controls.keyboard.pressed([17, 66], function() {
		DevMode.game.setCurrentState("Map Mode");
	});

	DevMode.controls.keyboard.pressed([17, 80], function() {
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