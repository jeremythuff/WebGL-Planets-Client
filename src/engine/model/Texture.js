import { Asset } from "./Asset.js"

export class Texture extends Asset {
	constructor(url, name) {
		super("TEXTURE", url, name);
	}
}	