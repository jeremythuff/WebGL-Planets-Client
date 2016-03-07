import { ComponentRegistry } from "context/Component.js"

let Wired = function(target) {

	let oldProto = target.prototype;
	let result = function() {

		let originalArgs = arguments;
		let injectedArgs = [];

		_getArgs(target.prototype.constructor).forEach(function(arument,i) {
			if(ComponentRegistry.has(arument)) {
				let component = ComponentRegistry.get(arument);
				injectedArgs.push(component);
			} else {
				injectedArgs[i] = originalArgs[i];
			}
		});

		oldProto.constructor.apply(this, injectedArgs);
	};
	result.prototype = oldProto;

	return result;

}

export { Wired }



var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;

let _getArgs = function(func) {  
    return (func+'').replace(/\s+/g,'')  
      .replace(/[/][*][^/*]*[*][/]/g,'') // strip simple comments  
      .split('){',1)[0].replace(/^[^(]*[(]/,'')
      .replace(/=[^,]+/g,'') // strip any ES6 defaults  
      .split(',').filter(Boolean); // split & filter [""]  
}  
