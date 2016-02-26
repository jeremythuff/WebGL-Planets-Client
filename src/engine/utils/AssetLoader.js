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

	loadTexture(texture) {

		let assetLoader = this;
		let deffered = new Deferred();

		assetLoader._textureLoader.load( texture.getUrl(), function ( loadedTexture ) {
			assetLoader.resources.textures.set(texture.name, loadedTexture);
			deffered.resolve();
		});

		return deffered.promise;

	}

	loadShader(url) {

	}

	loadImage(url) {

	}

	loadModel(url) {

	}

	loadAll(requestedAssets) {

		let assetLoader = this;
		let loadAllDefer = new Deferred();
		let promises = new Set();

		requestedAssets.forEach(function(requestedAsset) {
		
			let loadPromise = [];

			if(requestedAsset.type == "TEXTURE") {
				loadPromise = assetLoader.loadTexture(requestedAsset);
			}

			promises.add(loadPromise);
	
		});

		Promise.all(promises).then(function() {
			loadAllDefer.resolve(assetLoader.resources);
		});

		return loadAllDefer.promise; 

	}

}