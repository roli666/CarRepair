import configuration from "../static/configuration.json"

export class ApiFetcher {

    private static baseURL = `${configuration.APIProtocol}://${configuration.APIHostname}:${configuration.APIPort}/`

    public static async getData<T>(path = '', queryParams?: URLSearchParams): Promise<T | null> {
        const response = await fetch(this.baseURL + path + (queryParams?.toString() ?? ""));
        if (response.ok) {
            const data = await response.json()
            return data as T
        }
        return null
    }

    public static async postData(path = '', data = {}) : Promise<Response> {
        // Default options are marked with *
        const response = await fetch(this.baseURL + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            return response
        }
        return response
    }

    public static async putData(path = '',  queryParams?: URLSearchParams, data = {}) : Promise<Response> {
        // Default options are marked with *
        const response = await fetch(this.baseURL + path + (queryParams?.toString() ?? ""), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            return response
        }
        return response
    }

    public static async deleteData(path = '', queryParams?: URLSearchParams) : Promise<Response> {
        // Default options are marked with *
        const response = await fetch(this.baseURL + path + (queryParams?.toString() ?? ""), {
            method: 'DELETE',
        });
        if (response.ok) {
            return response
        }
        return response
    }
}