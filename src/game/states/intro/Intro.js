
import { State } from "engine/model/State";

let Intro = new State("Intro");

Intro.init(function() {
	console.log("Intro init");

	console.log(Intro);

	let keyboard = Intro.controls.keyboard;

	keyboard.when([keyboard.ENTER], function() {
		Intro.game.setCurrentState("Main Menu");
	});

});

Intro.load(function() {
	if(Intro.loaded) return;
	console.log("Intro loaded");
});

Intro.update(function(delta) {});

Intro.render(function(delta) {});

Intro.close(function() {
	console.log("Intro close");
});

Intro.destroy(function() {
	console.log("Intro destroy");
});

export {Intro};