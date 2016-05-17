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
        ApiRequest.status =  statuses.PREFLIGHT;
        ApiRequest.statuses = statuses;
        ApiRequest.channel = argObj.endpoint;
        ApiRequest.data = argObj.data;

    }

    setStatus(status) {
        this.status = status;
    } 

    getStatus() {
        return this.status;
    }

}
