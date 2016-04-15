export class Mouse {
	constructor() {
		this.buttons = new Map();
		this.cbs = new Map();
		this.position = new Map();
		this.zoom = new Map();
		this.ready = false;
		this._mousedownHandler = _mousedownHandler.bind(this);
		this._mouseupHandler = _mouseupHandler.bind(this).bind(this);
		this._mouseMoveHandler = _mouseMoveHandler.bind(this);
		this._mouseWheelHandler = _mouseWheelHandler.bind(this);
	}

	init(canvas) {	

		let mouse = this;

		canvas.addEventListener("mousedown", mouse._mousedownHandler, false);
		canvas.addEventListener("mouseup", mouse._mouseupHandler, false);
		canvas.addEventListener("mousemove", mouse._mouseMoveHandler, false);
		canvas.addEventListener("wheel", mouse._mouseWheelHandler, false);

	}

	activate() {
		let mouse = this;
		mouse.ready = true;
	}

	pressed(buttons,cb) {
		let mouse = this;
		mouse.cbs.set(buttons, cb);
	}

	destroy(canvas) {

		let mouse = this;

		canvas.removeEventListener("mousedown", mouse._mousedownHandler, false);
		canvas.removeEventListener("mouseup", mouse._mouseupHandler, false);
		canvas.removeEventListener("mousemove", mouse._mouseMoveHandler, false);
		canvas.removeEventListener("wheel", mouse._mouseWheelHandler, false);

		mouse.cbs.clear();
		mouse.buttons.clear();

		mouse.ready = false;
	}

}

let _mousedownHandler = function(e) {
	_mousedown(this, e);
}

let _mousedown = function(mouse, e) {
	mouse.buttons.set(e.which, true);
	_runCbs(mouse, e);
}

let _mouseupHandler = function(e) {
	_mouseup(this, e);
}

let _mouseup = function(mouse, e) {
	mouse.buttons.set(e.which, false);
}

let _mouseMoveHandler = function(e) {
	let mouse = this;
	mouse.position.set("x", e.clientX);
	mouse.position.set("y", e.clientY);
}

let _mouseWheelHandler = function(e) {
	let mouse = this;
	let x = mouse.zoom.get("x") ? mouse.zoom.get("x"): 0;
	let y = mouse.zoom.get("y") ? mouse.zoom.get("y"): 0;
	let z = mouse.zoom.get("z") ? mouse.zoom.get("z"): 0;

	mouse.zoom.set("x", x+e.deltaX);
	mouse.zoom.set("y", x+e.deltaY);
	mouse.zoom.set("z", x+e.deltaZ);

}

let _runCbs = function(mouse, e) {

	if(!mouse.ready) return;

	mouse.cbs.forEach(function(cb, buttons) {
		let pressed = true;

		buttons.forEach(function(button) {
			if(!keyboard.buttons.get(button)) pressed = false;
		});

		if(pressed) {
			cb();
		}
	});

}