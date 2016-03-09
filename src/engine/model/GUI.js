import { Wired } from "context/Wired.js"
import Handlebars from "handlebars/dist/handlebars.js"

@Wired
export class GUI {
	constructor(AjaxLoader) {
		this._ajax = AjaxLoader;
		this._viewUrls = new Map();
		this._loadPromises = new Set();
		this.views = new Map();
		this.context = {};

		Handlebars.registerHelper('list', function(items, options) {
			let out = "<ul>";

			for(let i=0, l=items.length; i<l; i++) {
			    out = out + "<li>" + options.fn(items[i]) + "</li>";
			}

			return out + "</ul>";
		});

	}

	addView(name, url) {
		let GUI = this;

		GUI._viewUrls.set(name, url);

		
	}

	setOnContext(key, value) {
		this.context[key] = value;
	}

	load() {
		
		let GUI = this;

		GUI._viewUrls.forEach(function(url, name) {
			
			let loadPromise = GUI._ajax.GET(url).then(function(source) {
				let template = Handlebars.compile(source);
				GUI.views.set(name, template(GUI.context));
			});

			GUI._loadPromises.add(loadPromise);

		});

	}

	init() {

		let GUI = this;

		Promise.all(GUI._loadPromises).then(function() {
			GUI.views.forEach(function(view) {
				console.log(view);
				_appendStringAsNodes(view);
			});
		});
			
	}

}

let _appendStringAsNodes = function(html) {
    var frag = document.createDocumentFragment(),
        tmp = document.createElement('body'), child;
    tmp.innerHTML = html;
    // Append elements in a loop to a DocumentFragment, so that the browser does
    // not re-render the document for each node
    while (child = tmp.firstChild) {
        frag.appendChild(child);
    }
    document.body.insertBefore(frag, document.body.firstChild); // Now, append all elements at once
    frag = tmp = null;
}