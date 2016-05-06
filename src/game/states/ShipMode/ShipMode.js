import { State } from "engine/model/State";
import { Camera } from "engine/model/Camera";
import { Keyboard } from "engine/io/Keyboard";
// import { StarBox } from "game/entities/StarBox";

import { SmallDeepSpaceFreighter } from "game/states/shipMode/entities/SmallDeepSpaceFreighter";

let ShipMode = new State("Ship Mode");

ShipMode.init(function() {
    console.log("ShipMode Init");

    let keyboard = ShipMode.controls.keyboard;

    keyboard.when([Keyboard.ESC], function() {
        ShipMode.game.setCurrentState("Main Menu");
    });

}); 

ShipMode.load(function() {

    if(ShipMode.loaded) return;

    ShipMode.camera = new Camera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    console.log(new SmallDeepSpaceFreighter());
    console.log("ShipMode Loaded");
});

ShipMode.update(function() {});

ShipMode.render(function() {
    ShipMode.renderer.render(ShipMode.scene, ShipMode.camera);
});

ShipMode.close(function() {
    console.log("ShipMode Close");
});

ShipMode.destroy(function() {
    console.log("ShipMode Destroy");
});

export { ShipMode };     