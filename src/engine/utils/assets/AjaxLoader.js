import { Service } from "context/Service";
import { Deferred } from "engine/extensions/Deferred";

export class AjaxLoader {
	constructor(headers) {
		this.headers = typeof headers !== undefined ? headers: {};
	}

	GET(url) {
		let deferred = new Deferred();
		_makeXhrReq("GET", url, null, deferred);				
		return deferred.promise;
	}

	POST(url, data) {
		let deferred = new Deferred();
		_makeXhrReq("POST", url, data, deferred);			
		return deferred.promise;
	}

	PUT(url, data) {
		let deferred = new Deferred();
		_makeXhrReq("PUT", url, data, deferred);				
		return deferred.promise;
	}

	DELETE(url, data) {
		let deferred = new Deferred();
		_makeXhrReq("DELETE", url, data, deferred);				
		return deferred.promise;
	}

}

let _makeXhrReq = function(method, url, data, deferred) {

	let client = new XMLHttpRequest();
	let uri = url;

	if (data && (method === 'POST' || method === 'PUT' || method === 'DELETE')) {
		uri += '?';
		var argcount = 0;
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				if (argcount++) {
					uri += '&';
				}
				uri += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
			}
		}


	}

	client.open(method, uri);

	//client.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    client.send();

	client.onload = function () {
		if (this.status >= 200 && this.status < 300) {
			// Performs the function "resolve" when this.status is equal to 2xx
			deferred.resolve(this.response);
		} else {
			// Performs the function "reject" when this.status is different than 2xx
			deferred.reject(this.statusText);
		}
	};
	
	client.onerror = function () {
		deferred.reject(this.statusText);
	};

}