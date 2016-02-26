export class Asset {
	constructor(type, url, name) {

		if(!name) {
			let urlSplit = url.split("/");
			let nameWithExt = urlSplit[urlSplit.length-1];
			name = nameWithExt.split(".")[0];
		}

		this.setType(type);
		this.setUrl(url);
		this.setName(name);
	}

	getType() {
		return this.type;
	}

	setType(type) {
		this.type = type;
	}

	getUrl() {
		return this.url;
	}

	setUrl(url) {
		this.url = url;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
	}

}