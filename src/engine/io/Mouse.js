export class Mouse {
	constructor() {
		this.buttons = new Map();
		this.cbs = new Map();
		this.position = new Map();
		this.scroll = new Map();
		this.ready = false;
		this.scrollTimer;
		this.moveTimer;
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

	when(actions, cb) {
		let mouse = this;
		mouse.cbs.set(actions, cb);
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

	mouse.buttons.set("move", true);

	if(mouse.moveTimer !== null) {
        clearTimeout(mouse.moveTimer);        
    }
    
    mouse.moveTimer = setTimeout(function() {
    	mouse.buttons.set("move", false);
    }, 100);

    _runCbs(mouse, e);

}

let _mouseWheelHandler = function(e) {

	let mouse = this;

	let originalX =  mouse.scroll.get("x");
	let originalY =  mouse.scroll.get("y");
	let originalZ =  mouse.scroll.get("z");

	let x = originalX ? mouse.scroll.get("x"): 0;
	let y = originalY ? mouse.scroll.get("y"): 0;
	let z = originalZ ? mouse.scroll.get("z"): 0;

	mouse.scroll.set("x", x+e.deltaX);
	mouse.scroll.set("y", y+e.deltaY);
	mouse.scroll.set("z", z+e.deltaZ);

	mouse.scroll.set("deltaX", e.deltaX);
	mouse.scroll.set("deltaY", e.deltaY);
	mouse.scroll.set("deltaZ", e.deltaZ);

	mouse.buttons.set("scroll", true);
	mouse.buttons.set("scrollup", originalY<mouse.scroll.get("y"));
	mouse.buttons.set("scrolldown", originalY>mouse.scroll.get("y"));

	if(mouse.scrollTimer !== null) {
        clearTimeout(mouse.scrollTimer);        
    }
    
    mouse.scrollTimer = setTimeout(function() {
    	mouse.buttons.set("scroll", false);
    	mouse.buttons.set("scrollup", false);
    	mouse.buttons.set("scrolldown", false);
    	mouse.scroll.set("deltaX", 0);
		mouse.scroll.set("deltaY", 0);
		mouse.scroll.set("deltaZ", 0);
    }, 100);

    _runCbs(mouse, e);

}

let _runCbs = function(mouse, e) {

	if(!mouse.ready) return;

	mouse.cbs.forEach(function(cb, buttons) {
		let pressed = true;

		buttons.forEach(function(button) {
			if(!mouse.buttons.get(button)) pressed = false;
		});

		if(pressed) {
			cb(mouse, e);
		}
	});

}