export class ApiResponse {
    constructor(rawResponse) {
        let responseObject = JSON.parse(rawResponse.body);
        this.meta = responseObject.meta;
        this.payload = responseObject.payload;
    }
}