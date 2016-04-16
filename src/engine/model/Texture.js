import { Asset } from "engine/model/Asset"

export class Texture extends Asset {
	constructor(url, name) {
		super("TEXTURE", url, name);
	}
}	