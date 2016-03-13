import { AjaxLoader } from "engine/utils/AjaxLoader.js"
import { Wired } from "context/Wired.js"
import Handlebars from "handlebars/dist/handlebars.js"

@Wired
export class GUI {
	constructor(AjaxLoader) {

		let GUI = this;

		GUI._ajax = AjaxLoader;
		GUI._viewUrls = new Map();
		GUI._loadPromises = new Set();
		GUI._views = new Map();
		GUI._context = {};
		GUI._loadAllPromise;
		GUI._dirtyContext = [];
		GUI.loaded = false;

	}

	addView(name, url) {
		let GUI = this;
		GUI._viewUrls.set(name, url);
	}

	setOnContext(key, value) {

		let GUI = this;

		eval("GUI._context." + key + " = value");

		var bindings = document.querySelectorAll("[data-bind='"+key+"']");
		for (var i = 0; i < bindings.length; ++i) {
		  	var binding = bindings[i];
		  	
		  	if(binding instanceof HTMLInputElement) {
		  		binding.value = value;
		  	} else {
		  		binding.innerHTML = value;
		  	}
		  
		}

	}

	load() {
		
		let GUI = this;

		GUI._viewUrls.forEach(function(url, name) {
			
			let loadPromise = GUI._ajax.GET(url).then(function(source) {
				let template = Handlebars.compile(source);
				let viewNode = _makeElementFragment(template(GUI._context))
				GUI._views.set(name, viewNode);
			});

			GUI._loadPromises.add(loadPromise);

		});

		GUI._loadAllPromise = Promise.all(GUI._loadPromises).then(function() {
			GUI.loaded = true;
		});

		Handlebars.registerHelper("bindfrom", function(binding) {
			var template = Handlebars.compile("<span data-bind='"+binding+"'>{{"+binding+"}}</span>");
			var result = template(GUI._context);
		  	return  new Handlebars.SafeString(result);
		});

		Handlebars.registerHelper("bindwith", function(binding) {
			var template = Handlebars.compile("data-bind='"+binding+"' value='{{"+binding+"}}'");
			var result = template(GUI._context);
		  	return  new Handlebars.SafeString(result);
		});
	}

	init() {

		let GUI = this;

		if(!GUI.loaded) {
			GUI._loadAllPromise.then(function() {
				GUI.drawGui();
			});
		} else {
			GUI.drawGui();
		}
			
	}

	update() {

	}

	drawGui() {

		let GUI = this;
		GUI._views.forEach(function(viewNode) {
			document.body.insertBefore(viewNode.cloneNode(true), document.body.firstChild); // Now, append all elements at once
		});

		var bindings = document.querySelectorAll("[data-bind]");
		
		for (var i = 0; i < bindings.length; ++i) {
	  		var binding = bindings[i];

		  	binding.addEventListener("input", function() {
		  		GUI.setOnContext(binding.dataset.bind, binding.value)
		  	}, false);
		}

	}

	close() {

		let GUI = this;

		let guiElems = [].slice.call(document.querySelectorAll(".gui-element"));

		guiElems.forEach(function(guiElem) {
			document.body.removeChild(guiElem);
		});

	}

}

let _makeElementFragment = function(html) {
    var frag = document.createDocumentFragment(),
        tmp = document.createElement('body'), child;
    tmp.innerHTML = html;
    // Append elements in a loop to a DocumentFragment, so that the browser does
    // not re-render the document for each node
    while (child = tmp.firstChild) {
    	child.className += " gui-element"
        frag.appendChild(child);
    }
    
    return frag;
}