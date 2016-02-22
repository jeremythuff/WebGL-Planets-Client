
import { State } from "./../../engine/model/State.js";

let MainMenu = new State("Main Menu");

MainMenu.init(function() {
	console.log("MainMenu init");

	console.log(MainMenu);
	
});

MainMenu.load(function() {
	console.log("MainMenu load");
});

MainMenu.update(function(delta) {});

MainMenu.render(function(delta) {});

MainMenu.close(function() {
	console.log("MainMenu close");
});

MainMenu.destroy(function() {
	console.log("MainMenu destroy");
});

MainMenu.controls.keyoard.pressed([13], function() {
	MainMenu.game.setCurrentState("Playing");
});

MainMenu.controls.keyoard.pressed([27], function() {
	MainMenu.game.stop();
});

export {MainMenu};