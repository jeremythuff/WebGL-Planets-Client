import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { Deferred } from 'engine/extensions/Deferred'
import { StorageService } from "engine/services/StorageService"

let statuses = {
    DISSCONNECTED: "DISSCONNECTED",
    CONNECTING: "CONNECTING",
    CONNECTED: "CONNECTED",
    DISSCONNECTING: "DISSCONNECTING"
}

export class WSService {
    constructor(webserviceUrl) {

        let WSService = this;

        WSService.statuses = statuses;
        WSService.status = statuses.DISSCONNECTED;
        WSService.ws = new SockJS(webserviceUrl+"/connect");
        WSService.stomp = Stomp.over(WSService.ws);
        WSService.subscriptions = new Set();

    }

    connect(headers) {

        let WSService = this;

        WSService.status = statuses.CONNECTING;

        if(!headers) headers = {};

        WSService.stomp.connect(headers, 
            function() {
                WSService.status = statuses.CONNECTED;
            }, 
            function() {    
                WSService.status = statuses.DISSCONNECTED;
            }
        );

    }

    disconnect() {
        let WSService = this;
        WSService.stomp.disconnect();
    }

    send(ApiRequest) {

        let WSService = this;

        let deferred = new Deferred();

        let channel = ApiRequest.domain+'/private/queue'+ApiRequest.endpoint

        if(!WSService.subscriptions.has(channel)) {

            let subObj = {
                channel: channel
            };

            WSService.subscriptions.add(subObj);

            WSService.stomp.subscribe(subObj.channel, function(res) {
                ApiRequest.setStatus(ApiRequest.statuses.RESOLVED);
                ApiRequest.deferred.resolve(res);
                console.log(res);
            }, function(e) {
                console.log(e);
                ApiRequest.deferred.reject(res);
            });
        }

        ApiRequest.addHeader("jwt", StorageService.getValue("JWT"));
        ApiRequest.addHeader("id", ApiRequest.id);
        ApiRequest.addHeader("data", ApiRequest.data);

        WSService.stomp.send(ApiRequest.domain+'/ws'+ApiRequest.endpoint, ApiRequest.headers, {});
        ApiRequest.setStatus(ApiRequest.statuses.PENDING);
        return deferred.promise;

    }

}
