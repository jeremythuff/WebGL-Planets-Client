import {AjaxLoader} from "./AjaxLoader.js"
import {ModelLoader} from "./ModelLoader.js"
import {ShaderLoader} from "./ShaderLoader.js"

export class Utilities {
	constructor() {
		this.ajax = new AjaxLoader();
		this.modelLoader = new ModelLoader();
		this.shaderLoader = new ShaderLoader();
	}
}