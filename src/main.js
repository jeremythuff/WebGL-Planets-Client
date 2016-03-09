import { Planets } from "game/planetsMain.js";

let planets = new Planets();

planets.init("Intro").then(function() {
	planets.start();
	console.log(planets);
});
