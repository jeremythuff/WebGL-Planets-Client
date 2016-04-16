import { AjaxLoader } from "engine/utils/AjaxLoader"

export class ShaderLoader {
	constructor() {
		this.ajax = new AjaxLoader();
	}

	load(url, cb) {
		let getPromsie = this.ajax.GET(url);

		getPromsie.then(function(program) {
			cb(program);
		});

		return getPromsie;

	}
}