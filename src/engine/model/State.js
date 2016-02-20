import { Scene } from "./Scene.js";
import { Controlls } from "./../io/Controlls.js";

export class State {
	constructor(name) {
		this.setName(name);
		
		this.initCbs = new Set();
		this.loadCbs = new Set();
		this.updateCbs = new Set();
		this.renderCbs = new Set();
		this.closeCbs = new Set();
		this.destroyCbs = new Set();

		this.scene = new Scene();
		this.controlls = new Controlls();

	}

	start() {
		let state = this;
		state.runLoad().then(function() {
			state.runInit();
		});

	}

	stop() {
		let state = this;
		state.runClose().then(function() {
			state.runDestroy();
		});
	}

	init(cb) {
		this.initCbs.add(_promiseify(cb));
	}

	runInit() {
		return _runCbs(this.initCbs);
	}

	load(cb) {
		this.loadCbs.add(_promiseify(cb));
	}

	runLoad() {
		return _runCbs(this.loadCbs);
	}

	update(cb) {
		this.updateCbs.add(cb);
	}

	render(cb) {
		this.renderCbs.add(cb);
	}

	close(cb) {
		this.closeCbs.add(_promiseify(cb));
	}

	runClose() {
        return _runCbs(this.closeCbs);
	}

	destroy(cb) {
		this.destroyCbs.add(_promiseify(cb));
	}

	runDestroy() {
        return _runCbs(this.destroyCbs);
	}

	setName(name) {
		this.name = name;
	}

	getName() {
		return this.name;
	}

}

let _runCbs = function(cbSet) {
	let promises = new Set();

	for(let cb of cbSet) {
        promises.add(new Promise(function(resolve){
          cb(resolve);
        }));
    }

    return Promise.all(promises);
}

let _promiseify = function(cb) {
	var orCb = cb;
	cb = function(done) {
		orCb();
		if(done) done();
	}

	return cb;
}