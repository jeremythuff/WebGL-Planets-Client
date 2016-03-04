import { THREE } from 'three';
import {Utilities} from "./utils/Utilities.js"

export class Engine {
	constructor() {
		this.startLoop();
		this.utils = new Utilities();
		this.running = false;
	}

	start() {
		this.running = true;
	}

	stop() {
		this.running = false;
		this.destroy();
	}

	startLoop() {
		let engine = this;
		let clock = new THREE.Clock();
	    
	    let lastFrame = new Date();
	    let raf = window.requestAnimationFrame 		 ||
	        	  window.mozRequestAnimationFrame    ||
	              window.webkitRequestAnimationFrame ||
	              window.msRequestAnimationFrame     ||
	              window.oRequestAnimationFrame;
	    
	    function loop( now ) {	        
            raf(loop);
            let delta = clock.getDelta();

            if(engine.running !== false) {
            	engine.update( delta );
            	if ( delta < 160 ) {
	                engine.render( delta );		           
	            }
	        }
	        lastFrame = now;
		        
		}
		    
		loop(lastFrame);
		      
	}

	destroy(){}

}