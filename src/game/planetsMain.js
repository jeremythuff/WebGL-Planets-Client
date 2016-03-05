import { Game } from "engine/model/Game.js";

import { Intro } from "game/states/intro/Intro.js";
import { MainMenu } from "game/states/mainMenu/MainMenu.js";
import { MapMode } from "game/states/mapMode/MapMode.js";
import { PlanetMode } from "game/states/planetMode/PlanetMode.js";

//This is for experementation
import { DevMode } from "game/states/DevMode.js";


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

