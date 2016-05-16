export class ApiResponse {
    constructor(rawResponse) {
        let responseObject = JSON.parse(data);

        this.meta = responseObject.meta;
        this.payload = responseObject.payload;
        
    }
}