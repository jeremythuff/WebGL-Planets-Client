import { Keyboard } from "engine/io/Keyboard";
import { Mouse } from "engine/io/Mouse";
import { Gamepad } from "engine/io/Gamepad";

export class Controls {
	constructor() {
		
		this.keyboard = new Keyboard();
		this.mouse = new Mouse();
		this.gamepad = new Gamepad();

	}

	init(canvas) {
	
		let controls = this;
	
		controls.keyboard.init(canvas);
		controls.mouse.init(canvas);
		//controls.gamepad.init(canvas);
	
	}

	activate() {
	
		let controls = this;
	
		setTimeout(function() {
			controls.keyboard.activate();
			controls.mouse.activate();
			//controls.gamepad.activate();
		}, 250);	
	
	}

	destroy(canvas) {
		
		let controls = this;

		controls.keyboard.destroy(canvas);
		controls.mouse.destroy(canvas);
		//controls.gamepad.destroy(canvas);
	
	}
}