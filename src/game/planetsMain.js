import { Game } from "engine/model/Game";

import { Intro } from "game/states/intro/Intro";
import { Login } from "game/states/login/Login";
import { MainMenu } from "game/states/mainMenu/MainMenu";
import { MapMode } from "game/states/mapMode/MapMode";
import { PlanetMode } from "game/states/planetMode/PlanetMode";
import { ShipMode } from "game/states/shipMode/ShipMode";

//This is for experementation
import { DevMode } from "game/states/devMode/devMode";


export class Planets extends Game {
	constructor() {
		super("WebGL Planets");
	}

	init(initialStateName) {
		this.addState(Intro);
		this.addState(MainMenu);
		this.addState(Login);
		this.addState(MapMode);
		this.addState(PlanetMode);
		this.addState(ShipMode);
		this.addState(DevMode);
		return super.init(initialStateName);
	}

}

