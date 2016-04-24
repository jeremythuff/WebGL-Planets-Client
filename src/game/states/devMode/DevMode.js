import { THREE } from 'three';
import { State } from "engine/model/State";
import { Camera } from "engine/model/Camera";

import { Star } from "game/states/devMode/entities/Star";

let DevMode = new State("Development Mode");

DevMode.init(function() {

	console.log("Development Mode init");

	DevMode.renderer.clear();

});

DevMode.load(function() {

	DevMode.gui.addView("Menu Bar", "src/game/states/devMode/gui/templates/devMenu.hbs");
	DevMode.camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	DevMode.star = new Star(0xff8c00, 6);

	Promise.all([
		DevMode.star.load()
	]).then(function() {
		
		DevMode.scene.add(new THREE.AmbientLight( 0x666666 ));
		DevMode.scene.add(DevMode.star.getMesh());

		DevMode.camera.position.z = 15;

		console.log(DevMode);
		console.log("Development Mode loaded");
	});

});

DevMode.update(function(delta) {
	DevMode.star.update(delta, DevMode);
});

DevMode.render(function(delta) {
	DevMode.renderer.render(DevMode.scene, DevMode.camera);
});

DevMode.close(function() {

});

DevMode.destroy(function() {

});

export { DevMode };