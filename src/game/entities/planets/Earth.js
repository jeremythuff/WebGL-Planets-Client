import { AbstractPlanet } from "./AbstractPlanet.js"
import { Texture } from "./../../../engine/model/Texture.js"

export class Earth extends AbstractPlanet {
	constructor() {
		super({
	    	size: 0.5,
	    	atmosphereSize: 0.008,
	    	map: new Texture("src/game/resources/textures/earth/earthmap.jpg", "map"),
	    	bump: new Texture("src/game/resources/textures/earth/earthbump.jpg", "bump"),
	    	spec: new Texture("src/game/resources/textures/earth/earthspec.jpg", "spec"),
	    	atmosphere: new Texture("src/game/resources/textures/earth/clouds.png", "atmosphere"), 
	    	rotationSpeed: 28,
	    	windSpeed: 140
	    });
	}

}