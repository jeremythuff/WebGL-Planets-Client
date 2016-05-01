import { THREE } from 'three';
import { State } from "engine/model/State";
import { Keyboard } from "engine/io/Keyboard";
import { Camera } from "engine/model/Camera";
import { StarBox } from "game/entities/StarBox";
import { IntroLights } from "game/states/intro/lights/IntroLights";
import { Eclipse } from "game/states/intro/entities/Eclipse";

let Intro = new State("Intro");

Intro.init(function() {
	
	console.log("Intro init");
	console.log(Intro);

	Intro.renderer.clear();
	
	Intro.controls.keyboard.when([Keyboard.ENTER], function() {
		Intro.game.setCurrentState("Main Menu");
	});

});

Intro.load(function() {
	if(Intro.loaded) return;

	Intro.camera = new Camera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	Intro.lights = new IntroLights();
	Intro.starBox = new StarBox();
	Intro.eclipse = new Eclipse();

	Promise.all([
		Intro.eclipse.load(),
		Intro.starBox.load()
	]).then(function() {
		Intro.directionalLight = Intro.lights.getDirectionalLight();
		Intro.scene.add(Intro.lights.getAmbientLight());
		Intro.scene.add(Intro.directionalLight);
		Intro.scene.add(Intro.eclipse.getMesh());
		Intro.scene.add(Intro.starBox.getMesh());

	    Intro.camera.position.z = 6;
	    let target = new THREE.Vector3(Intro.eclipse.getMesh().position.x, Intro.eclipse.getMesh().position.y+10, Intro.eclipse.getMesh().position.z);
	 	Intro.camera.lookAt(target);

	    console.log(Intro);
		console.log("Intro loaded");

		//let keyboard = Intro.controls.keyboard;

		// keyboard.when([keyboard.UPARROW, keyboard.X], function() {
		// 	Intro.directionalLight.position.x += 0.1;
		// 	console.log(Intro.directionalLight.position);
		// });

		// keyboard.when([keyboard.DOWNARROW, keyboard.X], function() {
		// 	Intro.directionalLight.position.x -= 0.1;
		// 	console.log(Intro.directionalLight.position);
		// });

		// keyboard.when([keyboard.UPARROW, keyboard.Y], function() {
		// 	Intro.directionalLight.position.y += 0.1;
		// 	console.log(Intro.directionalLight.position);
		// });

		// keyboard.when([keyboard.DOWNARROW, keyboard.Y], function() {
		// 	Intro.directionalLight.position.y -= 0.1;
		// 	console.log(Intro.directionalLight.position);
		// });

		// keyboard.when([keyboard.UPARROW, keyboard.Z], function() {
		// 	Intro.directionalLight.position.z += 0.1;
		// 	console.log(Intro.directionalLight.position);
		// });

		// keyboard.when([keyboard.DOWNARROW, keyboard.Z], function() {
		// 	Intro.directionalLight.position.z -= 0.1;
		// 	console.log(Intro.directionalLight.position);
		// });
		

	});

	Intro.gui.addView("Menu Bar", "src/game/states/intro/gui/templates/title.hbs");

	console.log("Intro loaded");
});

Intro.update(function(delta) {
	//Intro.starMapBg.update(delta, Intro);
});

Intro.render(function(delta) {
	Intro.renderer.render(Intro.scene, Intro.camera);
});

Intro.close(function() {
	Intro.gui.close();
	console.log("Intro close");
});

Intro.destroy(function() {
	console.log("Intro destroy");
});

export {Intro};