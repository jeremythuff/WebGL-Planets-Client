import { Keyboard } from "./Keyboard.js";
import { Mouse } from "./Mouse.js";
import { Gamepad } from "./Gamepad.js";

export class Controls {
	constructor() {
		
		this.keyoard = new Keyboard();
		this.mouse = new Mouse();
		this.gamepad = new Gamepad();

	}

	init() {
		this.keyoard.init();
		//this.mouse.init();
		//this.gamepad.init();
	}

	destroy() {
		this.keyoard.destroy();
		//this.mouse.destroy();
		//this.gamepad.destroy();
	}
}