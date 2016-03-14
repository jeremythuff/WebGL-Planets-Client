
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

	setTimeout(function() {
		MainMenu.gui.updateContext("mainMenu.title", "It changed!!!!");
		MainMenu.gui.updateContext("mainMenu.bool", true);
		MainMenu.gui.updateContext("mainMenu.select", 3);
	}, 5000);

});

MainMenu.load(function() {
	if(MainMenu.loaded) return;

	let context = {};

	MainMenu.gui.updateContext("mainMenu", context);

	context.title = "WebGL Planets";
	context.bool = false;
	context.select = 2;
	context.selectOptions = [
		{label:"option one", value: 1},
		{label:"option two", value: 2},
		{label:"option three", value: 3}
	];
	context.menu = [
		{label: "Map Mode"},
		{label: "Planet Mode"},
		{label: "Exit"}
	];


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