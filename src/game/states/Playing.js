
import { State } from "./../../engine/model/State.js";

let Playing = new State("Main Menu");

Playing.init(function() {
	console.log("Playing init");
});

Playing.load(function() {
	console.log("Playing load");
});

Playing.update(function(delta) {
	console.log("Playing update " + delta);
});

Playing.render(function(delta) {
	console.log("Playing render " + delta);
});

Playing.close(function() {
	console.log("Playing close");
});

Playing.destroy(function() {
	console.log("Playing destroy");
});

export {Playing};