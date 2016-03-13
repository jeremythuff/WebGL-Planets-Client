import { THREE } from 'three';
import { Engine } from "engine/Engine.js";
import { Renderer } from "engine/model/Renderer.js";

export class Game extends Engine {
	constructor(name) { 
  		super();
  		
  		this.setName(name);
      
      this.renderer = new Renderer();
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  		
      this.currentState = null;
  		this.states = new Map();

  	}

  	init(stateName) {

  		let game = this;

        console.log("Game Start");

        game.renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.insertBefore(game.renderer.domElement, document.body.firstChild);

        window.addEventListener('resize', function(){
            game.renderer.setSize( window.innerWidth, window.innerHeight );
        }, true);
        
  		return game.setCurrentState(stateName);
  	}

  	update(delta) {
        let game = this;
  		if(game.currentState) {
            for(let updateCb of game.currentState.updateCbs) {
                updateCb(delta);
            }
            game.currentState.updateGui();
        } 
  	}

  	render(delta) {
        let game = this;
  		
        if(game.currentState && game.currentState.initialized) {
            for(let renderCb of game.currentState.renderCbs) {
                renderCb(delta);
            }
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
            console.log("Game Stop");
        });

        return stateDestroyedPromise;

  	}

    getName() {
        let game = this;
        return game.name;
    }

    setName(name) {
        let game = this;
        game.name = name;
        document.title = name;
    }

  	addState(state) {
        let game = this;
        state.game = game;
        state.renderer = game.renderer;
        state.utils = game.utils;
  		game.states.set(state.getName(), state);
  	}

  	getState(stateName) {
        let game = this;
  		return game.states.get(stateName);
  	}

  	getCurrentState() {
        let game = this;
  		return game.currentState;
  	}

  	setCurrentState(stateName) {

  		let game = this;
		let lastState = game.getCurrentState();
  		let nextState = game.getState(stateName);
        let promises = new Set();

        let stateLoadedPromise;

        if(lastState) {
            lastState.stop().then(function() {
                if(nextState) {
                    stateLoadedPromise = nextState.start();
                    game.currentState = nextState;
                }
            });
        } else {
            if(nextState) {
                stateLoadedPromise = nextState.start();
                game.currentState = nextState;
            }
        }

        return stateLoadedPromise;

  	}

}