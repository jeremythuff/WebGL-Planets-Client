
import { Engine } from "../Engine.js";

export class Game extends Engine {
	  constructor(name) { 
  		super();
  		
  		this.setName(name);

  		this.currentState = null;
  		this.states = new Map();

  	}

  	init(stateName) {
  		let game = this;
  		return game.setCurrentState(stateName);
  	}

  	update(delta) {
  		if(this.currentState) {
        for(let updateCb of this.currentState.updateCbs) {
          updateCb(delta);
        }
      } 
  	}

  	render(delta) {
  		if(this.currentState)
  		for(let renderCb of this.currentState.renderCbs) {
  			renderCb(delta);
  		}
  	}

  	destroy() {
  		
  		let game = this;
      let currentState = game.getCurrentState();
  		let promises = new Set();

      if(currentState) {
        for(let closeCb of currentState.closeCbs) {
          promises.add(currentState.stop());
        }
      }

      let stateDestroyedPromise = Promise.all(promises);

      stateDestroyedPromise.then(function() {
        game.currentState = null;
      });

      return stateDestroyedPromise;

  	}

    getName() {
      return this.name;
    }

    setName(name) {
      this.name = name;
      document.title = name;
    }

  	addState(state) {
      state.game = this;
      state.utils = this.utils;
  		this.states.set(state.getName(), state);
  	}

  	getState(stateName) {
  		return this.states.get(stateName);
  	}

  	getCurrentState() {
  		return this.currentState;
  	}

  	setCurrentState(stateName) {

  		let game = this;
		  let lastState = game.getCurrentState();
  		let nextState = game.getState(stateName);
      let promises = new Set();

      if(lastState) {
        for(let closeCb of lastState.closeCbs) {
          promises.add(lastState.stop());
        }
      }
      
      if(nextState) {
         for(let loadCb of nextState.loadCbs) {
            promises.add(nextState.start());
         }
      }

      let stateLoadedPromise = Promise.all(promises);

      stateLoadedPromise.then(function() {
        game.currentState = nextState;
      });

      return stateLoadedPromise;

  	}

}