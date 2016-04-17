
import { State } from "engine/model/State";
import { Keyboard } from "engine/io/Keyboard";

let MainMenu = new State("Main Menu");

MainMenu.init(function() {

	console.log("MainMenu init");

	MainMenu.controls.keyboard.when([Keyboard.ESC], function() {
		let lastStateName = MainMenu.game.getLastState().name;
		MainMenu.game.setCurrentState(lastStateName);
	});

});

MainMenu.load(function() {
	if(MainMenu.loaded) return;
	
	MainMenu.context.menu = {
		mapMode: {
			gloss: "Map Mode",
			action: function(e) {
				MainMenu.game.setCurrentState("Map Mode");
			}
		},
		planetMode: {
			gloss: "Planet Mode",
			action: function(e) {
				MainMenu.game.setCurrentState("Planet Mode");
			}
		},
		devMode: {
			gloss: "Development Mode",
			action: function(e) {
				MainMenu.game.setCurrentState("Development Mode");
			}
		},
		exit: {
			gloss: "Exit",
			action: function(e) {
				MainMenu.game.stop();
			}
		}
	};
		
	MainMenu.gui.addView("Title", "src/game/states/MainMenu/gui/templates/title.hbs");
	MainMenu.gui.addView("Menu", "src/game/states/MainMenu/gui/templates/menu.hbs");

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