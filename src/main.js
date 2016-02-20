
import { Planets } from "./game//planetsMain.js";


let planets = new Planets();


planets.init("Intro").then(function() {
	
	planets.start();

	setTimeout(function() {

		planets.setCurrentState("Main Menu");

		setTimeout(function() {
			
			planets.setCurrentState("Playing");

			setTimeout(function() {
				planets.stop();
				console.log(planets);
			}, 2500);

		}, 2500);
		
	}, 2500);

});