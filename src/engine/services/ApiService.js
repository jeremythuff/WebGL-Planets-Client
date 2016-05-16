import { AjaxLoader } from "engine/utils/assets/AjaxLoader"
import { WSService } from "engine/services/WSService"
import { ApiResponse } from "engine/model/ApiResponse"
import { ApiRequest } from "engine/model/ApiRequest"

export class ApiService {
    constructor(domain, mode) {
        this._domain = domain;
        this._ajax = new AjaxLoader();
        this._ws = new WSService(domain);
        this._ws.connect();
        this._mode = typeof mode !== undefined ? mode : ApiService.modeType.AJAX;
    }
}

ApiService.modeType = {
    WS: "WS",
    WS: "AJAX"
}