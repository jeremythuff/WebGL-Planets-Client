let ServiceRegistry = new Map();

let Service = function(componentArgs) {

	if(typeof componentArgs == "Object" || typeof componentArgs == "undefined") {
		
		// Here things can be done with the component arguments object
		
		return function decorator(target) {
			ServiceRegistry.set(target.name, new target());
		}

	} else {
		let target = componentArgs;
		ServiceRegistry.set(target.name, new target());
	}
	
}

export { Service, ServiceRegistry }