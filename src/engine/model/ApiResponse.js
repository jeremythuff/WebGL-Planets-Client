export class ApiResponse {
    constructor(rawResponse) {
        let responseObject = JSON.parse(rawResponse);
        this.meta = responseObject.meta;
        this.payload = responseObject.payload;
    }
}