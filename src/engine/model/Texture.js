import { Asset } from "engine/model/Asset.js"

export class Texture extends Asset {
	constructor(url, name) {
		super("TEXTURE", url, name);
	}
}	