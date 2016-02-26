import { Deferred } from "./../extensions/Deferred.js"

import { AjaxLoader } from "./AjaxLoader.js"
import { TextureLoader } from "./TextureLoader.js"
import { ShaderLoader } from "./ShaderLoader.js"
import { ModelLoader } from "./ModelLoader.js"

export class AssetLoader {
	constructor() {

		this._manager = new THREE.LoadingManager();
		this._textureLoader = new TextureLoader();
		this._modelLoader = new ModelLoader();
		this._imageLoader = new AjaxLoader();
		this._shaderLoader = new ShaderLoader();

		this._manager.onProgress = function ( item, loaded, total ) {
			console.log( item, loaded, total );
		};

		this.resources = {
			"images": new Map(),
			"shaders": new Map(),
			"models": new Map(),
			"textures": new Map(),
		}

	}

	loadTexture(url, name) {

		let assetLoader = this;

		let deffered = new Deferred();

		if(!name) {
			let urlSplit = url.split("/");
			let nameWithExt = urlSplit[urlSplit.length-1];
			let name = nameWithExt.split(".")[0];
		}

		assetLoader._textureLoader.load( url, function ( texture ) {
			this.resources.texture.set(name, texture);
			deferred.resolve(this.resources);
		});

		return deferred.promise;

	}

	loadShader(url) {

	}

	loadImage(url) {

	}

	loadModel(url) {

	}

	loadAll(requestedAssets) {

		let assetLoader = this;

		let promises = new Set();

		requestedAssets.forEach(function(requestedAsset) {
		  
			var load;

			if(requestedAsset.type == "texture") load = assetLoader.loadTexture;

			promises.set(load(requestedAsset.url, requestedAsset.name))


		});	

		return Promise.all(promises);

	}

}