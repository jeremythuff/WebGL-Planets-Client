import { Keyboard } from "./Keyboard.js";
import { Mouse } from "./Mouse.js";
import { Gamepad } from "./Gamepad.js";

export class Controls {
	constructor() {
		
		this.keyoard = new Keyboard();
		this.mouse = new Mouse();
		this.gamepad = new Gamepad();

	}
}