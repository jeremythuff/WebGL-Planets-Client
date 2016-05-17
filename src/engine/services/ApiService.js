import { AjaxLoader } from "engine/utils/assets/AjaxLoader"
import { Deferred } from "engine/extensions/Deferred"
import { WSService } from "engine/services/WSService"
import { ApiResponse } from "engine/model/ApiResponse"
import { ApiRequest } from "engine/model/ApiRequest"

let modeType = {
    WS: "WS",
    AJAX: "AJAX"
}

class ApiService {
    constructor(domain, mode) {
        this.modeType = modeType;
        this._domain = domain;
        this["_"+modeType.AJAX] = new AjaxLoader();
        this["_"+modeType.WS] = new WSService(domain);
        this._mode = typeof mode !== undefined ? modeType.AJAX : mode;
    }

    fetch(endpoint, data) {

        let ApiService = this;
        let ApiFetchDefer = new Deferred();

        let fetchPromise = ApiService[ApiService._mode+"Fetch"](new ApiRequest({
            endpoint: ApiService._domain+endpoint,
            data: data
        }));

        fetchPromise.then(function(rawResponse) {
            let apiResponse = new ApiResponse(rawResponse);
            ApiFetchDefer.resolve(apiResponse);
        });

        return ApiFetchDefer.promise;

    }

    [modeType.WS+"Fetch"](endpoint, data) {
       

    }

    [modeType.AJAX+"Fetch"](ApiRequest) {
        
        let ApiService = this;

        let ajaxToCall = ApiService["_"+modeType.AJAX].GET;

        if(typeof data === 'undefined') {
            ajaxToCall = ApiService["_"+modeType.AJAX].POST 
        }

        ApiRequest.setStatus(ApiRequest.statuses.PENDING);
        let ajaxPromise = ajaxToCall(ApiRequest.channel, ApiRequest.data);

        ajaxPromise.then(function(res) {
            ApiRequest.deferred.resolve(res);
            ApiRequest.setStatus(ApiRequest.statuses.RESOLVED);
        });

        return ApiRequest.deferred.promise;

    }

    setMode(mode) {
        this._mode = mode;
    }

}

let apiService = new ApiService("http://localhost:9000");

export { apiService as ApiService }

