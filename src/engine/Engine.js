import { THREE } from 'three';
import { Utilities } from "engine/utils/Utilities";
import { Context } from "context/Context";

/**
 *  @description Main class for the Engine.
 */
export class Engine {

	/**
	 * @method constructor
	 * @return {Engine}
	 *
	 * @description Initializes the Engine as not running and containing
	 * Utilities.
	 */
	constructor() {
		this.context = new Context();
		this.startLoop();
		this.utils = new Utilities();
		this.running = false;
	}

	/**
	 * @method start
	 * @return {VOID}
	 * 
	 * @description Engages the engine to the animation loop, if it has been started.
	 */
	start() {
		this.running = true;
	}

	/**
	 * @method stop
	 * @return {VOID}
	 *
	 * @description Disengages the engine to the animation loop, if it has been started.
	 */
	stop() {
		this.running = false;
		this.destroy();
	}

	/**
	 * @method startLoop
	 * @return {VOID}
	 *
	 * @description Begins the animation loop.
	 */
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

	destroy() {}

}