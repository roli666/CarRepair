import { ErrorHandler } from "./ErrorHandler"
import configuration from "../static/configuration.json"

export class ApiFetcher {

    private static baseURL = `${configuration.APIProtocol}://${configuration.APIHostname}:${configuration.APIPort}/`

    public static async getData<T>(path = ''): Promise<T | null> {
        const response = await fetch(this.baseURL + path);
        if (response.ok) {
            const data = await response.json()
            return data as T
        }
        ErrorHandler.showError(response.status)
        return null
    }

    public static async postData(path = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(this.baseURL + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json();
    }
}