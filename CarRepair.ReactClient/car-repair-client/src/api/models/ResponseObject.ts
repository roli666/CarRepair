export class ResponseObject {
    static fromJSON<T>(t: new () => T, jsonObject: any): T {
        return Object.assign(new t(), jsonObject)
    }
}