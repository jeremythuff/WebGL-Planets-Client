import { Game } from "./../engine/model/Game.js";

import { Intro } from "./states/Intro.js";
import { MainMenu } from "./states/MainMenu.js";
import { PlanetMode } from "./states/PlanetMode.js";

export class Planets extends Game {
	constructor() {
		super("WGL Planets");
	}

	init(initialStateName) {
		this.addState(Intro);
		this.addState(MainMenu);
		this.addState(PlanetMode);
		return super.init(initialStateName);
	}

}

