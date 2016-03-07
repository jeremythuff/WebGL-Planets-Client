let ComponentRegistry = new Map();

let Component = function(componentArgs) {

	if(typeof componentArgs == "Object" || typeof componentArgs == "undefined") {
		
		// Here things can be done with the component arguments object
		
		return function decorator(target) {
			ComponentRegistry.set(target.name, new target());
		}

	} else {
		let target = componentArgs;
		ComponentRegistry.set(target.name, new target());
	}
	
}

export { Component, ComponentRegistry }