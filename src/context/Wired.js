import { ComponentRegistry } from "context/Component.js"
import { ServiceRegistry } from "context/Service.js"

let Wired = function(target) {

	let oldProto = target.prototype;
	let result = function() {

		let originalArgs = arguments;
		let injectedArgs = [];
		let originalArgsUsed = 0;

		_getArgs(target.prototype.constructor).forEach(function(arument,i) {
			
			if(ComponentRegistry.has(arument)) {
				let component = ComponentRegistry.get(arument);
				injectedArgs.push(component);
			} else if(ServiceRegistry.has(arument)) { 
				let component = ServiceRegistry.get(arument);
				injectedArgs.push(component);
			} else {
				injectedArgs[i] = originalArgs[originalArgsUsed];
				originalArgsUsed++;
			}

		});

		oldProto.constructor.apply(this, injectedArgs);

	};
	result.prototype = oldProto;

	return result;

}

export { Wired }

let _getArgs = function(func) {  
    return (func+'').replace(/\s+/g,'')  
      .replace(/[/][*][^/*]*[*][/]/g,'') // strip simple comments  
      .split('){',1)[0].replace(/^[^(]*[(]/,'')
      .replace(/=[^,]+/g,'') // strip any ES6 defaults  
      .split(',').filter(Boolean); // split & filter [""]  
}  
