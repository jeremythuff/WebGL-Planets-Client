import { AjaxLoader } from "engine/utils/AjaxLoader"

let shaderCache = new Map();

export class ShaderLoader {
	constructor() {
		this.ajax = new AjaxLoader();
	}

	load(url, cb) {

		let cachedShader = shaderCache.get(url);
		if(typeof cachedShader !== 'undefined') return cachedShader;

		let ShaderLoader = this;

		let getPromise = this.ajax.GET(url);

		getPromise.then(function(program) {
			
			let includes = program.match(/^.*#include.*$/mg);

			for(let i in includes) {

				let include = includes[i];
				if(!include) continue;

				(function(include) {
					let path = include.replace("#include ", "");
					ShaderLoader.ajax.GET(path).then(function(includeProgram) {
						program = program.replace(/^.*#include.*$/mg, includeProgram);
						
						if(includes.indexOf(include) == includes.length-1) {
							shaderCache.set(url, program);
							cb(program);
						}

					});
				})(include)

			}

			if(!includes) {
				shaderCache.set(url, program);
				cb(program);			
			}

		});

		return getPromise;
	}
}