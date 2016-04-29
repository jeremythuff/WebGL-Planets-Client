import { THREE } from 'three';
import { Deferred } from "engine/extensions/Deferred";
import { AjaxLoader } from "engine/utils/AjaxLoader";
import { TextureLoader } from "engine/utils/TextureLoader";
import { ShaderLoader } from "engine/utils/ShaderLoader";
import { ObjectLoader } from "engine/utils/ObjectLoader";

let _textureCache = new Map();
let _shaderCache = new Map();

class AssetLoader {
	constructor() {

		let AssetLoader = this;

		AssetLoader._manager = new THREE.LoadingManager();
		AssetLoader._textureLoader = new TextureLoader(AssetLoader._manager);
		AssetLoader._objectLoader = new ObjectLoader(AssetLoader._manager);
		AssetLoader._imageLoader = new AjaxLoader();
		AssetLoader._shaderLoader = new ShaderLoader();

		AssetLoader._manager.onLoad = function () {
			console.log( "All Loaded!");
		};

		AssetLoader._manager.onProgress = function ( item, loaded, total ) {
			console.log( item, loaded, total );
		};

		AssetLoader._manager.onError = function (e) {
			console.log("ERROR");
			console.log(e);
		};

		AssetLoader.resources = {
			"images": new Map(),
			"shaders": new Map(),
			"objects": new Map(),
			"textures": new Map(),
			"misc": new Map()
		};

	}

	loadTexture(requesteTexture) {

		let AssetLoader = this;
		let defered = new Deferred();

		if(!_textureCache.has(requesteTexture.getUrl())) {
			
			let textureCacheArray = [];
			_textureCache.set(requesteTexture.getUrl(), textureCacheArray);
			textureCacheArray.push(defered);

			AssetLoader._textureLoader.load( requesteTexture.getUrl(), function ( loadedTexture ) {
				console.log("loaded textures");
				console.log(_textureCache.get(requesteTexture.getUrl()).length);
				AssetLoader.resources.textures.set(requesteTexture.name, loadedTexture);
				_textureCache.get(requesteTexture.getUrl()).forEach(function(defer) {
					defer.resolve();
				});
				_textureCache.delete(requesteTexture.getUrl());
			});

		} else {
			_textureCache.get(requesteTexture.getUrl()).push(defered);
		}
		
		return defered.promise;

	}

	loadShader(requestedShader) {

		let AssetLoader = this;
		let defered = new Deferred();

		if(!_shaderCache.has(requestedShader.getUrl())) {

			let shaderCacheArray = [];
			_shaderCache.set(requestedShader.getUrl(), shaderCacheArray);
			shaderCacheArray.push(defered);

			AssetLoader._shaderLoader.load( requestedShader.getUrl(), function ( program ) {
				console.log("loaded shaders");
				console.log(_shaderCache.get(requestedShader.getUrl()).length);
				requestedShader.setProgram(program);
				AssetLoader.resources.shaders.set(requestedShader.name, requestedShader);
				_shaderCache.get(requestedShader.getUrl()).forEach(function(defer) {
					defer.resolve();
				});
				_shaderCache.delete(requestedShader.getUrl());
			});

		} else {
			_shaderCache.get(requestedShader.getUrl()).push(defered);
		}

		return defered.promise;

	}

	loadImage(RequestedImage) {

		let AssetLoader = this;
		let defered = new Deferred();

		AssetLoader._shaderLoader.load( RequestedImage.getUrl(), function ( loadedImage ) {
			AssetLoader.resources.images.set(RequestedImage.name, loadedImage);
			defered.resolve();
		});

		return defered.promise;

	}

	loadObject(requestedObject) {

		let assetLoader = this;
		let defered = new Deferred();

		let load = assetLoader._objectLoader.load;
		if(requestedObject.type == "json") load = assetLoader._objectLoader.loadJson;

		load( requestedObject.getUrl(), function ( loadedObject ) {
			assetLoader.resources.objects.set(requestedObject.name, loadedObject);
			defered.resolve();
		});

		return defered.promise;

	}

	loadAsset(requestedAsset) {

		let AssetLoader = this;
		let defered = new Deferred();

		AssetLoader._shaderLoader.load( requestedAsset.getUrl(), function ( loadedImage ) {
			AssetLoader.resources.misc.set(requestedAsset.name, loadedImage);
			defered.resolve();
		});

		return defered.promise;

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

		//TODO: This timout is allowing texture requests enough
		// time to queue up. This is a hack that will not scale.
		// Anothoer solution is needed.
		setTimeout(function() {
			Promise.all(promises).then(function() {
				loadAllDefer.resolve(assetLoader.resources);
			});
		}, 1500);

		return loadAllDefer.promise; 

	}

}

let assetLoader = new AssetLoader();

export { assetLoader };