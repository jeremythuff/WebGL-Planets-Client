import { AjaxLoader } from "engine/utils/assets/AjaxLoader"
import { Deferred } from "engine/extensions/Deferred"
import { WSService } from "engine/services/WSService"
import { ApiResponse } from "engine/model/ApiResponse"
import { ApiRequest } from "engine/model/ApiRequest"
import { StorageService } from "engine/services/StorageService"

let modeType = {
    WS: "WS",
    AJAX: "AJAX"
}

class ApiService {
    constructor(domain, mode) {

        let ApiService = this;

        this.modeType = modeType;
        this._domain = domain;
        this["_"+modeType.AJAX] = new AjaxLoader();
        this["_"+modeType.WS] = new WSService(domain);
        this._mode = typeof mode !== undefined ? modeType.AJAX : mode;

        if(StorageService.getValue("JWT")) {
            ApiService.setMode(modeType.WS);
            ApiService["_"+modeType.WS].connect();
        }

        StorageService.when('JWT', function() {
            ApiService.setMode(modeType.WS);
            ApiService["_"+modeType.WS].connect();
        }, function() {
            ApiService.setMode(modeType.AJAX);
            ApiService["_"+modeType.WS].disconnect();
        });

    };

    fetch(endpoint, data, forceMode) {

        let ApiService = this;
        let ApiFetchDefer = new Deferred();

        let fetchPromise = ApiService[ApiService._mode+"Fetch"](new ApiRequest({
            domain: ApiService._domain,
            endpoint: endpoint,
            data: data
        }));

        fetchPromise.then(function(rawResponse) {
            let apiResponse = new ApiResponse(rawResponse);
            ApiFetchDefer.resolve(apiResponse);
        });

        return ApiFetchDefer.promise;

    };

    [modeType.WS+"Fetch"](ApiRequest) {

        let fetchDeferred = new Deferred();

        this["_"+modeType.WS].send(ApiRequest).then(function() {
            fetchDeferred.resolve("{}");
        });

        return fetchDeferred.promise;
    };

    [modeType.AJAX+"Fetch"](ApiRequest) {
        
        let ApiService = this;

        let ajaxToCall = ApiService["_"+modeType.AJAX].GET;

        if(typeof data === 'undefined') {
            ajaxToCall = ApiService["_"+modeType.AJAX].POST 
        }

        ApiRequest.setStatus(ApiRequest.statuses.PENDING);

        console.log(ApiService._domain);

        let ajaxPromise = ajaxToCall(ApiRequest.domain+ApiRequest.endpoint, ApiRequest.data);

        ajaxPromise.then(function(res) {
            ApiRequest.deferred.resolve(res);
            ApiRequest.setStatus(ApiRequest.statuses.RESOLVED);
        });

        return ApiRequest.deferred.promise;

    };

    setMode(mode) {
        this._mode = mode;
    };

}

let apiService = new ApiService("http://localhost:9000");

export { apiService as ApiService }

