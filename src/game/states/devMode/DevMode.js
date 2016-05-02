import { THREE } from 'three';
import { State } from "engine/model/State";
import { Camera } from "engine/model/Camera";

import { Eclipse } from "game/states/intro/entities/Eclipse";
import { Star } from "game/entities/Star";
import { Earth } from "game/states/planetMode/entities/Earth";
import { StarBox } from "game/entities/StarBox";
import { StarMapBg } from "game/states/mapMode/entities/StarMapBg";
import { StarMap } from "game/states/mapMode/entities/StarMap";

let DevMode = new State("Development Mode");

DevMode.init(function() {

	console.log("Development Mode init");

	DevMode.renderer.clear();

});

DevMode.load(function() {

	DevMode.gui.addView("Menu Bar", "src/game/states/devMode/gui/templates/devMenu.hbs");
	DevMode.camera = new Camera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

	DevMode.eclipse = new Eclipse();
	console.log(DevMode.eclipse);
	DevMode.star = new Star(0xff8c00, 6);
	DevMode.planet = new Earth();
	DevMode.StarMap = new StarMap();
	DevMode.StarMapBg = new StarMapBg();

	DevMode.light = new THREE.AmbientLight( 0x666666 );
	DevMode.light.visible = false;
	DevMode.scene.add(DevMode.light);

	DevMode.context.currentEntity = null;

	DevMode.context.menu = {
		eclipse: {
			gloss: "Eclipse",
			action: function(elem) {
				DevMode.camera.position.z = 6;
				DevMode.reset(DevMode.eclipse, elem);
			}
		},
		star: {
			gloss: "Star",
			action: function(elem) {
				DevMode.camera.position.z = 25;
				DevMode.reset(DevMode.star, elem);
			}
		},
		planet: {
			gloss: "Planet",
			action: function(elem) {
				DevMode.camera.position.z = 1;
				DevMode.reset(DevMode.planet, elem);
			}
		},
		starMap: {
			gloss: "StarMap",
			action: function(elem) {
				DevMode.camera.position.z = 40;
				DevMode.reset(DevMode.StarMap, elem);
				DevMode.light.visible = true;
			}
		},
		starMapBg: {
			gloss: "StarMapBg",
			action: function(elem) {
				DevMode.camera.position.z = 40;
				DevMode.reset(DevMode.StarMapBg, elem);
				DevMode.light.visible = true;
			}
		}
	};

	DevMode.context.backBtn = function() {
		DevMode.runDestroy();
	}

});

DevMode.update(function(delta) {
	if(DevMode.context.currentEntity)
	DevMode.context.currentEntity.update(delta, DevMode);
});

DevMode.render(function() {
	DevMode.renderer.render(DevMode.scene, DevMode.camera);
});

DevMode.close(function() {		
	
});

DevMode.reset = function(entity, elem) {
	console.log(entity);
	var elems = document.querySelectorAll(".menu-item");

	[].forEach.call(elems, function(el) {
	    el.classList.remove("active");
	});

	elem.classList.add("active");

	if(DevMode.context.currentEntity) DevMode.context.currentEntity.destroy(DevMode.scene);
	DevMode.renderer.clear();
	DevMode.light.visible = false;
	DevMode.context.currentEntity = entity;
	DevMode.context.currentEntity.load().then(function() {
		DevMode.scene.add(DevMode.context.currentEntity.getMesh());
	});

};

DevMode.destroy(function() {
	DevMode.renderer.clear();
	DevMode.loaded = false;
	DevMode.game.setCurrentState("Main Menu");
});

export { DevMode };