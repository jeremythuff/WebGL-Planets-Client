import { Planets } from "game/planetsMain.js";

let planets = new Planets();

planets.init("Intro").then(function() {
	planets.start();
	console.log(planets);
});


import { Component } from "context/Component.js"

@Component
class TestService {

}

@Component
class TestComponent {

}

import { Wired } from "context/Wired.js"

@Wired
class InjectedServices {
	constructor(ActualArg, TestComponent) {

		console.log(ActualArg);
		console.log(TestComponent);

	}
}


new InjectedServices("foo");