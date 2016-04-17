import { State } from "engine/model/State"

let DevMode = new State("Development Mode");

DevMode.init(function() {

});

DevMode.load(function() {

});

DevMode.update(function() {

});

DevMode.render(function() {

});

DevMode.close(function() {

});

DevMode.destroy(function() {

});

export { DevMode };