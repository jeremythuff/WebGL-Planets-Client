export class Keyboard {
	constructor() {

		this.keys = new Map();
		this.cbs = new Map();
		this.ready = false;
		
	}

	init() {
		
		let keyboard = this;

		window.addEventListener('keydown', _keyDownHandler.bind(this), false);
		window.addEventListener('keyup', _keyUpHandler.bind(this), false);

	}

	destroy() {
		
		let keyboard = this;

		window.removeEventListener('keydown', _keyDownHandler.bind(this), false);
		window.removeEventListener('keyup', _keyUpHandler.bind(this), false);

		keyboard.cbs.clear();
		keyboard.keys.clear();

		keyboard.ready = false;

	}

	activate() {
		let keyboard = this;
		keyboard.ready = true;
	}

	pressed(keys,cb) {
		let keyboard = this;
		keyboard.cbs.set(keys, cb);
	}

	getCbs() {
		let keyboard = this;
		return keyboard.cbs;
	}

}

let _keyDownHandler = function(e) {
    _keyDown(this, e);
}

let _keyDown = function(keyboard, e) {
	keyboard.keys.set(e.which, true);
	_runCbs(keyboard);
}	

let _keyUpHandler = function(e) {
    _keyUp(this, e);
}

let _keyUp = function(keyboard, e) {
	keyboard.keys.set(e.which, false);
}

let _runCbs = function(keyboard) {

	if(!keyboard.ready) return

	keyboard.cbs.forEach(function(cb, keys) {

		let pressed = true;

		keys.forEach(function(key) {
			if(!keyboard.keys.get(key)) pressed = false;
		});

		if(pressed) cb();

	});

}