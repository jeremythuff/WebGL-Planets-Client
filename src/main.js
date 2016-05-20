import { Planets } from "game/planetsMain";
import { Deferred } from "engine/extensions/Deferred";


let planets = new Planets();

planets.init("Intro").then(function() {
	
	planets.start();
	console.log(planets);

});