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

        let channel = '/private/queue'+ApiRequest.endpoint

        if(!WSService.subscriptions.has(channel)) {

            let subObj = {
                channel: channel
            };

            WSService.subscriptions.add(subObj);

            WSService.stomp.subscribe(subObj.channel, function(res) {
                ApiRequest.setStatus(ApiRequest.statuses.RESOLVED);
                ApiRequest.deferred.resolve(res);
            }, function(err) {
                ApiRequest.setStatus(ApiRequest.statuses.REJECTED);
                console.log(err);
                ApiRequest.deferred.reject(err);
            });
        }

        ApiRequest.addHeader("jwt", StorageService.getValue("JWT"));
        ApiRequest.addHeader("id", ApiRequest.id);
        ApiRequest.addHeader("data", ApiRequest.data);

        WSService.stomp.send('/ws'+ApiRequest.endpoint, ApiRequest.headers, {});
        ApiRequest.setStatus(ApiRequest.statuses.PENDING);
        return ApiRequest.deferred.promise;

    }

}
