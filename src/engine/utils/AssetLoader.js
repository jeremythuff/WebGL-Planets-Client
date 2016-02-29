import { Deferred } from "./../extensions/Deferred.js"

import { AjaxLoader } from "./AjaxLoader.js"
import { TextureLoader } from "./TextureLoader.js"
import { ShaderLoader } from "./ShaderLoader.js"
import { ObjectLoader } from "./ObjectLoader.js"

export class AssetLoader {
	constructor() {

		let AssetLoader = this;

		AssetLoader._manager = new THREE.LoadingManager();
		AssetLoader._textureLoader = new TextureLoader(AssetLoader._manager);
		AssetLoader._objectLoader = new ObjectLoader(AssetLoader._manager);
		AssetLoader._imageLoader = new AjaxLoader();
		AssetLoader._shaderLoader = new ShaderLoader();

		AssetLoader._manager.onProgress = function ( item, loaded, total ) {
			console.log( item, loaded, total );
		};

		AssetLoader.resources = {
			"images": new Map(),
			"shaders": new Map(),
			"objects": new Map(),
			"textures": new Map(),
			"misc": new Map()
		}

	}

	loadTexture(requesteTexture) {

		let AssetLoader = this;
		let deffered = new Deferred();

		AssetLoader._textureLoader.load( requesteTexture.getUrl(), function ( loadedTexture ) {
			AssetLoader.resources.textures.set(requesteTexture.name, loadedTexture);
			deffered.resolve();
		});

		return deffered.promise;

	}

	loadShader(requestedShader) {

		let AssetLoader = this;
		let deffered = new Deferred();

		AssetLoader._shaderLoader.load( requestedShader.getUrl(), function ( program ) {
			requestedShader.setProgram(program);
			AssetLoader.resources.shaders.set(requestedShader.name, requestedShader);
			deffered.resolve();
		});

		return deffered.promise;

	}

	loadImage(RequestedImage) {

		let AssetLoader = this;
		let deffered = new Deferred();

		AssetLoader._shaderLoader.load( RequestedImage.getUrl(), function ( loadedImage ) {
			AssetLoader.resources.images.set(RequestedImage.name, loadedImage);
			deffered.resolve();
		});

		return deffered.promise;

	}

	loadObject(requestedObject) {

		let assetLoader = this;
		let deffered = new Deferred();

		let load = assetLoader._objectLoader.load;
		if(type == "json") load = assetLoader._objectLoader.loadJson;

		load( requestedObject.getUrl(), function ( loadedObject ) {
			assetLoader.resources.objects.set(requestedObject.name, loadedObject);
			deffered.resolve();
		});

		return deffered.promise;

	}

	loadAsset(RequestedAsset) {

		let AssetLoader = this;
		let deffered = new Deferred();

		AssetLoader._shaderLoader.load( RequestedImage.getUrl(), function ( loadedImage ) {
			AssetLoader.resources.misc.set(RequestedImage.name, loadedImage);
			deffered.resolve();
		});

		return deffered.promise;

	}

	loadAll(requestedAssets) {

		let assetLoader = this;
		let loadAllDefer = new Deferred();
		let promises = new Set();

		requestedAssets.forEach(function(requestedAsset) {

			switch(requestedAsset.type) {
				case "IMAGE":
					let loadPromise = assetLoader.loadImage(requestedAsset);	
					break;
				case "SHADER":
					loadPromise = assetLoader.loadShader(requestedAsset);
					break;
				case "OBJECT":
					loadPromise = assetLoader.loadObject(requestedAsset);
					break;
				case "TEXTURE":
					loadPromise = assetLoader.loadTexture(requestedAsset);	
					break;
				default: 
					loadPromise = assetLoader.loadAsset(requestedAsset);	
			}

			promises.add(loadPromise);
	
		});

		Promise.all(promises).then(function() {
			loadAllDefer.resolve(assetLoader.resources);
		});

		return loadAllDefer.promise; 

	}

}