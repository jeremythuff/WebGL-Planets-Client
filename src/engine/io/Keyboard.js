export class Keyboard {
	constructor() {

		this.keys = new Map();
		this.cbs = new Map();
		this.ready = false;
		this._keyDownHandler = _keyDownHandler.bind(this);
		this._keyUpHandler = _keyUpHandler.bind(this);
	}

	init(canvas) {

		let keyboard = this;
		
		window.addEventListener('keydown', keyboard._keyDownHandler, false);
		window.addEventListener('keyup', keyboard._keyUpHandler, false);

	}

	destroy(canvas) {
		
		let keyboard = this;

		window.removeEventListener('keydown', keyboard._keyDownHandler, false);
		window.removeEventListener('keyup', keyboard._keyUpHandler, false);

		keyboard.cbs.clear();
		keyboard.keys.clear();

		keyboard.ready = false;

	}

	activate() {
		let keyboard = this;
		keyboard.ready = true;
	}

	when(keys,cb) {
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
	_runCbs(keyboard, e);
}	

let _keyUpHandler = function(e) {
    _keyUp(this, e);
}

let _keyUp = function(keyboard, e) {
	keyboard.keys.set(e.which, false);
}

let _runCbs = function(keyboard, e) {

	if(!keyboard.ready) return

	keyboard.cbs.forEach(function(cb, keys) {

		let pressed = true;

		keys.forEach(function(key) {
			if(!keyboard.keys.get(key)) pressed = false;
		});

		if(pressed) {
			e.preventDefault();
			cb(keyboard, e);
		}

	});

}