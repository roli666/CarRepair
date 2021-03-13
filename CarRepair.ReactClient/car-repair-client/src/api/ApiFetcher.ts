import { ErrorHandler } from "./ErrorHandler"
import configuration from "../static/configuration.json"

export class ApiFetcher {

    private errorHandler: ErrorHandler
    private baseURL: string

    constructor(err: ErrorHandler) {
        this.errorHandler = err
        this.baseURL = `${configuration.APIProtocol}://${configuration.APIHostname}:${configuration.APIPort}/`
    }

    public async getData<T>(path = ''): Promise<T | null> {
        const response = await fetch(this.baseURL + path);
        if (response.ok) {
            const data = await response.json()
            return data as T
        }
        this.errorHandler.showError(response.status)
        return null
    }

    public async postData(path = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(this.baseURL + path, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
}