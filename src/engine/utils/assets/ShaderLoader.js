import { AjaxLoader } from "engine/utils/assets/AjaxLoader"

export class ShaderLoader {
	constructor() {
		this.ajax = new AjaxLoader();
	}

	load(url, cb) {

		let ShaderLoader = this;

		let getPromise = ShaderLoader.ajax.GET(url);

		getPromise.then(function(program) {
			
			let includes = program.match(/^.*#include.*$/mg);

			for(let i in includes) {

				let include = includes[i];
				if(!include) continue;

				(function(include) {
					let path = include.replace("#include ", "");
					ShaderLoader.ajax.GET(path).then(function(includeProgram) {
						program = program.replace(/^.*#include.*$/mg, includeProgram);
						
						if(includes.indexOf(include) == includes.length-1) cb(program);

					});
				})(include)

			}

			if(!includes) cb(program);

		});

		return getPromise;
	}
}