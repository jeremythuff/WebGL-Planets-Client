import { Asset } from "engine/model/Asset.js"

export class Shader extends Asset {
	constructor(url) {

		let urlSplit = url.split("/");
		let nameWithExt = urlSplit[urlSplit.length-1];
		let name = nameWithExt.split(".")[0];
		let shaderType = nameWithExt.split(".")[1];

		super("SHADER", url, name+"-"+shaderType);

		this.shaderType = shaderType;
		this.url = url;
		this.program = null;
	}

	getType() {
		return this.shaderType;
	}

	getUrl() {
		return this.url;
	}

	getProgram() {
		return this.program;
	}

	getProgram(program) {
		return this.program;
	}

	setProgram(program) {
		this.program = program;
	}

}