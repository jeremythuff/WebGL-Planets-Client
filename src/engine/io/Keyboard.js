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

		for (var [keycode, keyname] of _keyMappings) {
		  this[keyname] = keycode;
		}

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

let _keyMappings = new Map();

_keyMappings.set(8, 'BACKSPACE');
_keyMappings.set(9, 'TAB');
_keyMappings.set(13, 'ENTER');
_keyMappings.set(16, 'SHIFT');
_keyMappings.set(17, 'CTRL');
_keyMappings.set(18, 'ALT');
_keyMappings.set(20, 'CAPSLOCK');
_keyMappings.set(27, 'ESC');
_keyMappings.set(33, 'PAGEUP');
_keyMappings.set(34, 'PAGEDOWN');
_keyMappings.set(35, 'END');
_keyMappings.set(36, 'HOME');
_keyMappings.set(19, 'BREAK');
_keyMappings.set(37, 'LEFTARROW');
_keyMappings.set(38, 'UPARROW');
_keyMappings.set(39, 'RIGHTARROW');
_keyMappings.set(40, 'DOWNARROW');
_keyMappings.set(45, 'INSERT');
_keyMappings.set(46, 'DELETE');
_keyMappings.set(48, '0');
_keyMappings.set(49, '1');
_keyMappings.set(50, '2');
_keyMappings.set(51, '3');
_keyMappings.set(52, '4');
_keyMappings.set(53, '5');
_keyMappings.set(54, '6');
_keyMappings.set(55, '7');
_keyMappings.set(56, '8');
_keyMappings.set(57, '9');
_keyMappings.set(65, 'A');
_keyMappings.set(66, 'B');
_keyMappings.set(67, 'C');
_keyMappings.set(68, 'D');
_keyMappings.set(69, 'E');
_keyMappings.set(70, 'F');
_keyMappings.set(71, 'G');
_keyMappings.set(72, 'H');
_keyMappings.set(73, 'I');
_keyMappings.set(74, 'J');
_keyMappings.set(75, 'K');
_keyMappings.set(76, 'L');
_keyMappings.set(77, 'M');
_keyMappings.set(78, 'N');
_keyMappings.set(79, 'O');
_keyMappings.set(80, 'P');
_keyMappings.set(81, 'Q');
_keyMappings.set(82, 'R');
_keyMappings.set(83, 'S');
_keyMappings.set(84, 'T');
_keyMappings.set(85, 'U');
_keyMappings.set(86, 'V');
_keyMappings.set(87, 'W');
_keyMappings.set(88, 'x');
_keyMappings.set(89, 'Y');
_keyMappings.set(90, 'Z');
_keyMappings.set(91, 'LEFTWINDOWKEY');
_keyMappings.set(92, 'RIGHTWINDOWKEY');
_keyMappings.set(93, 'SELECTKEY');
_keyMappings.set(96, 'NUM0');
_keyMappings.set(97, 'NUM1');
_keyMappings.set(98, 'NUM2');
_keyMappings.set(99, 'NUM3');
_keyMappings.set(100, 'NUM4');
_keyMappings.set(101, 'NUM5');
_keyMappings.set(102, 'NUM6');
_keyMappings.set(103, 'NUM7');
_keyMappings.set(104, 'NUM8');
_keyMappings.set(105, 'NUM9');
_keyMappings.set(106, 'MULITPLY');
_keyMappings.set(107, 'ADD');
_keyMappings.set(109, 'SUBTRACT');
_keyMappings.set(110, 'DECIMALPOINT');
_keyMappings.set(111, 'DIVIDE');
_keyMappings.set(112, 'F1');
_keyMappings.set(113, 'F2');
_keyMappings.set(114, 'F3');
_keyMappings.set(115, 'F4');
_keyMappings.set(116, 'F5');
_keyMappings.set(117, 'F6');
_keyMappings.set(118, 'F7');
_keyMappings.set(119, 'F8');
_keyMappings.set(120, 'F9');
_keyMappings.set(121, 'F10');
_keyMappings.set(122, 'F11');
_keyMappings.set(123, 'F12');
_keyMappings.set(144, 'NUMLOCK');
_keyMappings.set(145, 'SCROLLLOCK');
_keyMappings.set(186, 'SEMICOLON');
_keyMappings.set(187, 'EQUALSIGN');
_keyMappings.set(188, 'COMMA');
_keyMappings.set(189, 'DASH');
_keyMappings.set(190, 'PERIOD');
_keyMappings.set(191, 'FOREWARDSLASH');
_keyMappings.set(192, 'GRAVEACCENT');
_keyMappings.set(219, 'OPENBRAKET');
_keyMappings.set(220, 'BACKSLASH');
_keyMappings.set(221, 'CLOSEBRAKET');
_keyMappings.set(222, 'SINGLEQUOTE');