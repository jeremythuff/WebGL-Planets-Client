import { Deferred } from "engine/extensions/Deferred"

let idGenerator = {
    lastId: 0,
    next: function() {
        lastId += 1;
        return lastId;
    }
}

export class ApiRequest {
    constructor(argObj) {

        let ApiRequest = this;

        ApiRequest.id = idGenerator.next();
        ApiRequest.defer = new Deferred();
        ApiRequest.status =  ApiRequest.statuses.PREFLIGHT;
        ApiRequest.channel = argObj.channel;
        ApiRequest.data = argObj.data;

    }
}

ApiRequest.statuses ={
    PREFLIGHT: "PREFLIGHT",
    PENDING: "PENDING",
    RESOLVED: "RESOLVED"
}