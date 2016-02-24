
import { State } from "./../../engine/model/State.js";

let MainMenu = new State("Main Menu");



MainMenu.init(function() {

	console.log("MainMenu init");

	MainMenu.renderer.clear();

	MainMenu.controls.keyboard.pressed([13], function() {
		MainMenu.game.setCurrentState("Map Mode");
	});

	MainMenu.controls.keyboard.pressed([27], function() {
		MainMenu.game.stop();
	});
	
});

MainMenu.load(function() {
	if(MainMenu.loaded) return;
	console.log("MainMenu loaded");
});

MainMenu.update(function(delta) {});

MainMenu.render(function(delta) {});

MainMenu.close(function() {
	console.log("MainMenu close");
});

MainMenu.destroy(function() {
	console.log("MainMenu destroy");
});

export {MainMenu};