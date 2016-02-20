
import { State } from "./../../engine/model/State.js";

let MainMenu = new State("Main Menu");

MainMenu.init(function() {
	console.log("MainMenu init");
});

MainMenu.load(function() {
	console.log("MainMenu load");
});

MainMenu.update(function(delta) {
	console.log("MainMenu update " + delta);
});

MainMenu.render(function(delta) {
	console.log("MainMenu render " + delta);
});

MainMenu.close(function() {
	console.log("MainMenu close");
});

MainMenu.destroy(function() {
	console.log("MainMenu destroy");
});

export {MainMenu};