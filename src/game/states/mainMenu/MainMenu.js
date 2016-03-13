
import { State } from "engine/model/State.js";

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

	MainMenu.gui.init();

});

MainMenu.load(function() {
	if(MainMenu.loaded) return;

	MainMenu.gui.setOnContext("mainMenu", {
		title: "WebGL Planets",
		menu: [
			{label: "Map Mode"},
			{label: "Planet Mode"},
			{label: "Exit"}
		]
	});

	MainMenu.gui.addView("Title", "src/game/states/MainMenu/gui/templates/title.hbs");
	MainMenu.gui.addView("Menu", "src/game/states/MainMenu/gui/templates/menu.hbs");

	MainMenu.gui.load();

	console.log(MainMenu);
	console.log("MainMenu loaded");
});

MainMenu.update(function(delta) {});

MainMenu.render(function(delta) {});

MainMenu.close(function() {
	MainMenu.gui.close();
	console.log("MainMenu close");
});

MainMenu.destroy(function() {
	console.log("MainMenu destroy");
});

export {MainMenu};