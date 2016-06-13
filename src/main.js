import { Planets } from "game/planetsMain";

let planets = new Planets();

planets.init("Intro").then(function() {
	
	planets.start();
	console.log(planets);

});