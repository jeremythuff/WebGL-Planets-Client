import { Deferred } from "engine/extensions/Deferred.js";
import { AjaxLoader } from "engine/utils/AjaxLoader.js"
import Handlebars from "handlebars/dist/handlebars.js"

export class TemplateEngine {
	constructor(gui) {
		let TemplateEngine = this;

		TemplateEngine._ajax = new AjaxLoader();
		TemplateEngine.GUI = gui;
	}

	load() {
		let TemplateEngine = this;

		Handlebars.registerHelper("bind", function(binding) {
			let template = Handlebars.compile("<span data-bind='"+binding+"'>{{"+binding+"}}</span>");
			let result = template(TemplateEngine.GUI._context);
		  	return  new Handlebars.SafeString(result);
		});

		Handlebars.registerHelper("bindinput", function(binding) {
			let template = Handlebars.compile("data-bind='"+binding+"' value='{{"+binding+"}}'");
			let result = template(TemplateEngine.GUI._context);
		  	return  new Handlebars.SafeString(result);
		});

		Handlebars.registerHelper("bindcheck", function(binding) {
			let bool = TemplateEngine.GUI.getContextValue(binding);
			let template = Handlebars.compile("data-bind='"+binding+"'" + (bool ? "checked" : ""));
			let result = template(TemplateEngine.GUI._context);
		  	return  new Handlebars.SafeString(result);
		});
	}

	loadView(url) {
		let TemplateEngine = this;
		let deferred = new Deferred();

		this._ajax.GET(url).then(function(source) {
			let template = Handlebars.compile(source);
			let viewNode = _makeElementFragment(template(TemplateEngine.GUI._context))
			deferred.resolve(viewNode);
		});

		return deferred.promise;
	}

	drawViews(viewNodes) {
		let TemplateEngine = this;

		viewNodes.forEach(function(viewNode) {
			document.body.insertBefore(viewNode.cloneNode(true), document.body.firstChild); // Now, append all elements at once
		});

		let bindings = document.querySelectorAll("[data-bind]");
		
		for (let i = 0; i < bindings.length; ++i) {
	  		
	  		(function() {
	  			let binding = bindings[i];

		  		if(binding.type == "text" || binding.type == "textarea") {
		  			binding.addEventListener("input", function() {
				  		TemplateEngine.GUI.updateContext(binding.dataset.bind, binding.value)
				  	}, false);	
		  		}

		  		if(binding.type == "checkbox") {
		  			binding.addEventListener("click", function(e) {
				  		TemplateEngine.GUI.updateContext(binding.dataset.bind, e.target.checked)
				  	}, false);	
		  		}

		  		if(binding.tagName == "SELECT") {

		  			binding.value = TemplateEngine.GUI.getContextValue(binding.dataset.bind);

		  			binding.addEventListener("change", function(e) {
				  		TemplateEngine.GUI.updateContext(binding.dataset.bind, e.target.options[e.target.selectedIndex].value);
				  	}, false);	
		  		}
	  		})(i);
		  	
		}
	}

	destroyViews(viewNodes) {
		viewNodes.forEach(function(guiElem) {
			document.body.removeChild(guiElem);
		});
	}

}

let _makeElementFragment = function(html) {
    let frag = document.createDocumentFragment(),
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
