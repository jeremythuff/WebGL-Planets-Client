import { AssetLoader } from "engine/utils/assets/AssetLoader"
import { Maths } from "engine/utils/math/Maths"

export class Utilities {
	constructor() {
		this.assetLoader = AssetLoader;
        this.math = new Maths();

	}
}