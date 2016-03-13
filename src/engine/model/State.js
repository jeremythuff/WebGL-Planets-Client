import { Scene } from "engine/model/Scene.js";
import { GUI } from "engine/model/GUI.js";
import { Controls } from "engine/io/Controls.js";

export class State {
	constructor(name) {

		this.game;

		this.setName(name);
		
		this.initCbs = new Set();
		this.loadCbs = new Set();
		this.updateCbs = new Set();
		this.renderCbs = new Set();
		this.closeCbs = new Set();
		this.destroyCbs = new Set();

		this.loaded = false;
		this.initialized = false;

		this.gui = new GUI();
		this.scene = new Scene();
		this.controls = new Controls();

		this.renderer;
	}

	start() {

		let state = this;

		state.controls.init();

		let loadPromise = state.runLoad();

		loadPromise.then(function() {
			state.runInit();
			state.controls.activate();
		});

		return loadPromise;

	}

	stop() {

		let state = this;
		let stopPromise = state.runClose();

		stopPromise.then(function() {
			state.runDestroy();
			state.controls.destroy();
		});

		return stopPromise;

	}

	init(cb) {
		this.initCbs.add(_promiseify(cb));
	}

	runInit() {
		
		let state = this;
		let initPromise = _runCbs(this.initCbs);
		
		initPromise.then(function() {
			state.initialized = true;
		});
		
		return initPromise;

	}

	load(cb) {
		this.loadCbs.add(_promiseify(cb));
	}

	runLoad() {

		let state = this;
		let loadPromise = _runCbs(this.loadCbs);

		loadPromise.then(function() {
			state.loaded = true;
		});

		return loadPromise;
	}

	update(cb) {
		let state = this;
		state.updateCbs.add(cb);
	}

	updateGui() {
	}

	render(cb) {
		let state = this;
		state.renderCbs.add(cb);
	}

	close(cb) {
		let state = this;
		state.closeCbs.add(_promiseify(cb));
	}

	runClose() {

		let state = this;
		let closePromise = _runCbs(this.closeCbs);

		return closePromise;
    
	}

	destroy(cb) {
		let state = this;
		state.destroyCbs.add(_promiseify(cb));
	}

	runDestroy() {
        let state = this;
		let destroyPromise = _runCbs(this.destroyCbs);

		return destroyPromise;
	}

	setName(name) {
		let state = this;
		state.name = name;
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