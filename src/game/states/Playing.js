
import { State } from "./../../engine/model/State.js";
import { Camera } from "./../../engine/model/Camera.js";

let Playing = new State("Playing");

Playing.init(function() {

	Playing.camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

	Playing.controls.keyboard.pressed([27], function() {
		Playing.game.setCurrentState("Main Menu");
	});

	Playing.ambientLight = new THREE.AmbientLight( 0x555555 ); // soft white light 
	Playing.scene.add( Playing.ambientLight );

	Playing.spotLight = new THREE.SpotLight(0xbbbbbb);
    Playing.spotLight.position.set(500, 500, 50);
    Playing.spotLight.castShadow = true;
    Playing.scene.add(Playing.spotLight);

	let geometry  = new THREE.SphereGeometry(0.5, 32, 32)
	let material  = new THREE.MeshPhongMaterial();
	material.map    = THREE.ImageUtils.loadTexture('src/game/resources/textures/earth/earthmap1k.jpg');
	material.bumpMap    = THREE.ImageUtils.loadTexture('src/game/resources/textures/earth/earthbump1k.jpg')
	material.bumpScale = 0.05;
	material.specularMap    = THREE.ImageUtils.loadTexture('src/game/resources/textures/earth/earthspec1k.jpg');
	material.specular  = new THREE.Color('grey');
	let earthMesh = new THREE.Mesh(geometry, material);

	let clodGeometry   = new THREE.SphereGeometry(0.505, 32, 32)
	let cloudMaterial  = new THREE.MeshPhongMaterial({
	  map     : THREE.ImageUtils.loadTexture('src/game/resources/textures/earth/clouds.jpg'),
	  side        : THREE.DoubleSide,
	  opacity     : 0.3,
	  transparent : true,
	  depthWrite  : false,
	});
	let cloudMesh = new THREE.Mesh(clodGeometry, cloudMaterial)
	earthMesh.add(cloudMesh);

	
	Playing.scene.add(earthMesh);


	
	Playing.camera.position.z = 1;

	console.log("Playing init");
	console.log(Playing);

});

Playing.load(function() {
	if(Playing.loaded) return;
	console.log("Playing load");
});

Playing.update(function(delta) {});

Playing.render(function(delta) {
	Playing.renderer.render(Playing.scene, Playing.camera);
});

Playing.close(function() {
	console.log("Playing close");
});

Playing.destroy(function() {
	console.log("Playing destroy");
});

export {Playing};