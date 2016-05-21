import { TemplateEngine } from "engine/io/TemplateEngine"

export class GUI {
	constructor(context) {
		let GUI = this;

		GUI._templateEngine = new TemplateEngine(this);
		GUI._viewUrls = new Map();
		GUI._loadPromises = new Set();
		GUI._views = new Map();
		GUI._context = context;
		GUI._loadAllPromise;
		GUI.loaded = false;
	}

	addView(name, url) {
		let GUI = this;
		GUI._viewUrls.set(name, url);
	}

	updateContext(key, value) {
		let GUI = this;
		eval("GUI._context." + key + " = value");

		let bindings = document.querySelectorAll("[data-bind^='"+key.split('.')[0]+"']");

		for (let i = 0; i < bindings.length; ++i) {

			(function() {
				let binding = bindings[i];
		  		console.log();
			  	if(binding.type == "text" || binding.type == "textarea") {
		  			binding.value = eval("GUI._context." + binding.dataset.bind);
		  		} else if(binding.type == "checkbox") {
		  			binding.checked = eval("GUI._context." + binding.dataset.bind);
		  		} else if(binding.tagName == "SELECT") {
		  			binding.value = eval("GUI._context." + binding.dataset.bind);
		  		} else {
		  			binding.innerHTML = eval("GUI._context." + binding.dataset.bind);
		  		}	
			})(i);

		}

	}

	getContextValue(key) {
		let GUI = this;
		return eval("GUI._context." + key);
	}

	callOnContext(toCall, elem, e) {
		let GUI = this;
		eval("GUI._context." + toCall);
	}

	load() {
		let GUI = this;

		GUI._viewUrls.forEach(function(url, name) {
			
			let loadPromise = GUI._templateEngine.loadView(url, name);

			loadPromise.then(function(viewNode) {
				GUI._views.set(name, viewNode);
			});

			GUI._loadPromises.add(loadPromise);

		});

		GUI._loadAllPromise = Promise.all(GUI._loadPromises).then(function() {
			GUI.loaded = true;
		});

		GUI._templateEngine.load();

		return GUI._loadPromises;
		
	}

	init(cb) {
		let GUI = this;

		if(!GUI.loaded) {
			GUI._loadAllPromise.then(function() {
				GUI._templateEngine.drawViews(GUI._views, cb);
			});
		} else {
			GUI._templateEngine.drawViews(GUI._views, cb);
		}
	}

	update() {}

	close() {
		let GUI = this;
		let guiElems = [].slice.call(document.querySelectorAll(".gui-element"));

		GUI._templateEngine.destroyViews(guiElems);
	}

}
