import { Game } from "engine/model/Game";

import { Intro } from "game/states/intro/Intro";
import { MainMenu } from "game/states/mainMenu/MainMenu";
import { MapMode } from "game/states/mapMode/MapMode";
import { PlanetMode } from "game/states/planetMode/PlanetMode";

//This is for experementation
import { DevMode } from "game/states/devMode/devMode";


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

