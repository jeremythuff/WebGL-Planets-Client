import { Keyboard } from "./Keyboard.js";
import { Mouse } from "./Mouse.js";
import { Gamepad } from "./Gamepad.js";

export class Controls {
	constructor() {
		
		this.keyboard = new Keyboard();
		this.mouse = new Mouse();
		this.gamepad = new Gamepad();

	}

	init() {
	
		let controls = this;
	
		this.keyboard.init();
		//this.mouse.init();
		//this.gamepad.init();
	
	}

	activate() {
	
		let controls = this;
	
		setTimeout(function() {
			controls.keyboard.activate();
			//this.mouse.activate();
			//this.gamepad.activate();
		}, 250);	
	
	}

	destroy() {
		
		let controls = this;

		this.keyboard.destroy();
		//this.mouse.destroy();
		//this.gamepad.destroy();
	
	}
}