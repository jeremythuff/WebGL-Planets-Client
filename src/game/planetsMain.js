import { Game } from "./../engine/model/Game.js";

import { Intro } from "./states/Intro.js";
import { MainMenu } from "./states/MainMenu.js";
import { Playing } from "./states/Playing.js";

export class Planets extends Game {
	constructor() {
		super("WGL Planets");
	}

	init(initialStateName) {
		this.addState(Intro);
		this.addState(MainMenu);
		this.addState(Playing);
		return super.init(initialStateName);
	}

}

