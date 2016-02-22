
import { State } from "./../../engine/model/State.js";

let Playing = new State("Playing");

Playing.init(function() {
	console.log("Playing init");

	console.log(Playing);

});

Playing.load(function() {
	console.log("Playing load");
});

Playing.update(function(delta) {});

Playing.render(function(delta) {});

Playing.close(function() {
	console.log("Playing close");
});

Playing.destroy(function() {
	console.log("Playing destroy");
});

Playing.controls.keyoard.pressed([27], function() {
	Playing.game.setCurrentState("Main Menu");
});

export {Playing};