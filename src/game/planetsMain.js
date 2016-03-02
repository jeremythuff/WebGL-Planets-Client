import { Game } from "./../engine/model/Game.js";

import { Intro } from "./states/Intro.js";
import { MainMenu } from "./states/MainMenu.js";
import { MapMode } from "./states/MapMode.js";
import { PlanetMode } from "./states/PlanetMode.js";
import { DevMode } from "./states/DevMode.js";


export class Planets extends Game {
	constructor() {
		super("WebGL Planets");
	}

	init(initialStateName) {
		this.addState(Intro);
		this.addState(MainMenu);
		this.addState(MapMode);
		this.addState(PlanetMode);
		this.addState(DevMode);
		return super.init(initialStateName);
	}

}

