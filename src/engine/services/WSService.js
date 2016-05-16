import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

let statuses = {
    DISSCONNECTED: "DISSCONNECTED",
    CONNECTING: "CONNECTING",
    CONNECTED: "CONNECTED",
    DISSCONNECTING: "DISSCONNECTING"
}

export class WSService {
    constructor(webserviceUrl) {

        let WSService = this;

        WSService.status = statuses.DISSCONNECTED;

        WSService.ws = new SockJS(webserviceUrl+"/connect");
        WSService.stomp = Stomp.over(WSService.ws);

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
        });

    }

}

WSService.statuses = statuses;

