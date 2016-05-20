import { Deferred } from "engine/extensions/Deferred"

let idGenerator = {
    lastId: 0,
    next: function() {
        idGenerator.lastId += 1;
        return idGenerator.lastId;
    }
}

let statuses ={
    PREFLIGHT: "PREFLIGHT",
    PENDING: "PENDING",
    RESOLVED: "RESOLVED"
}

export class ApiRequest {
    constructor(argObj) {

        let ApiRequest = this;

        ApiRequest.id = idGenerator.next();
        ApiRequest.deferred = new Deferred();
        ApiRequest.headers = argObj.headers ? argObj.headers : {};
        ApiRequest.status =  statuses.PREFLIGHT;
        ApiRequest.statuses = statuses;
        ApiRequest.domain = argObj.domain;
        ApiRequest.endpoint = argObj.endpoint;
        ApiRequest.data = argObj.data ? argObj.data : "";

    }

    addHeader(key, value) {
        this.headers[key] = value;
    }

    setHeaders(headers) {
        this.headers = headers;
    }

    getHeaders() {
        return this.headers;
    }

    setStatus(status) {
        this.status = status;
    } 

    getStatus() {
        return this.status;
    }

    setChannel(channel) {
        this.channel = channel;
    }

    getChannel() {
        return this.channel;
    }

}
