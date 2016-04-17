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

Keyboard.BACKSPACE = 8; 
Keyboard.TAB = 9; 
Keyboard.ENTER = 13; 
Keyboard.SHIFT = 16; 
Keyboard.CTRL = 17; 
Keyboard.ALT = 18; 
Keyboard.CAPSLOCK = 20; 
Keyboard.ESC = 27; 
Keyboard.PAGEUP = 33; 
Keyboard.PAGEDOWN = 34; 
Keyboard.END = 35; 
Keyboard.HOME = 36; 
Keyboard.BREAK = 19; 
Keyboard.LEFTARROW = 37; 
Keyboard.UPARROW = 38; 
Keyboard.RIGHTARROW = 39; 
Keyboard.DOWNARROW = 40; 
Keyboard.INSERT = 45; 
Keyboard.DELETE = 46; 
Keyboard.ZERO = 48; 
Keyboard.ONE = 49; 
Keyboard.TWO = 50; 
Keyboard.THREE = 51; 
Keyboard.FOUR = 52; 
Keyboard.FIVE = 53; 
Keyboard.SIX = 54; 
Keyboard.SEVEN = 55; 
Keyboard.EIGHT = 56; 
Keyboard.NINE = 57; 
Keyboard.A = 65; 
Keyboard.B = 66; 
Keyboard.C = 67; 
Keyboard.D = 68; 
Keyboard.E = 69; 
Keyboard.F = 70; 
Keyboard.G = 71; 
Keyboard.H = 72; 
Keyboard.I = 73; 
Keyboard.J = 74; 
Keyboard.K = 75; 
Keyboard.L = 76; 
Keyboard.M = 77; 
Keyboard.N = 78; 
Keyboard.O = 79; 
Keyboard.P = 80; 
Keyboard.Q = 81; 
Keyboard.R = 82; 
Keyboard.S = 83; 
Keyboard.T = 84; 
Keyboard.U = 85; 
Keyboard.V = 86; 
Keyboard.W = 87; 
Keyboard.X = 88; 
Keyboard.Y = 89; 
Keyboard.Z = 90; 
Keyboard.LEFTWINDOWKEY = 91; 
Keyboard.RIGHTWINDOWKEY = 92; 
Keyboard.SELECTKEY = 93; 
Keyboard.NUM0 = 96; 
Keyboard.NUM1 = 97; 
Keyboard.NUM2 = 98; 
Keyboard.NUM3 = 99; 
Keyboard.NUM4 = 100; 
Keyboard.NUM5 = 101; 
Keyboard.NUM6 = 102; 
Keyboard.NUM7 = 103; 
Keyboard.NUM8 = 104; 
Keyboard.NUM9 = 105; 
Keyboard.MULITPLY = 106; 
Keyboard.ADD = 107; 
Keyboard.SUBTRACT = 109; 
Keyboard.DECIMALPOINT = 110; 
Keyboard.DIVIDE = 111; 
Keyboard.F1 = 112; 
Keyboard.F2 = 113; 
Keyboard.F3 = 114; 
Keyboard.F4 = 115; 
Keyboard.F5 = 116; 
Keyboard.F6 = 117; 
Keyboard.F7 = 118; 
Keyboard.F8 = 119; 
Keyboard.F9 = 120; 
Keyboard.F10 = 121; 
Keyboard.F11 = 122; 
Keyboard.F12 = 123; 
Keyboard.NUMLOCK = 144; 
Keyboard.SCROLLLOCK = 145; 
Keyboard.SEMICOLON = 186; 
Keyboard.EQUALSIGN = 187; 
Keyboard.COMMA = 188; 
Keyboard.DASH = 189; 
Keyboard.PERIOD = 190; 
Keyboard.FOREWARDSLASH = 191; 
Keyboard.GRAVEACCENT = 192; 
Keyboard.OPENBRAKET = 219; 
Keyboard.BACKSLASH = 220; 
Keyboard.CLOSEBRAKET = 221; 
Keyboard.SINGLEQUOTE = 222; 