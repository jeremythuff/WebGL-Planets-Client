export class Keyboard {
	constructor() {

		this.keys = new Map();
		this.cbs = new Map();
		
	}

	init() {
		window.addEventListener('keydown', function(e) {
            _keyDown(this, e);
        }.bind(this), false);
		
		window.addEventListener('keyup', function(e) {
            _keyUp(this, e);
        }.bind(this), false);
	}

	destroy() {
		window.removeEventListener('keydown', function(e) {
            _keyDown(this, e);
        }, false);
		
		window.removeEventListener('keyup', function(e) {
            _keyUp(this, e);
        }, false);
	}

	pressed(keys,cb) {
		this.cbs.set(keys, cb);
	}

	getCbs() {
		return this.cbs;
	}

}

let _keyDown = function(keyboard, e) {
	keyboard.keys.set(e.which, true);
	_runCbs(keyboard);
}	

let _keyUp = function(keyboard, e) {
	keyboard.keys.set(e.which, false);
}

let _runCbs = function(keyboard) {

	keyboard.cbs.forEach(function(cb, keys) {

		let pressed = true;

		keys.forEach(function(key) {
			if(!keyboard.keys.get(key)) pressed = false;
		});

		if(pressed) cb();

	});

}