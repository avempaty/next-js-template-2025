/// <reference lib="dom" />

class ApiClient {
    host: string
    defaultHeaders: Headers
    constructor() {
        this.host = '/* API HOST */'
        this.defaultHeaders = {
            // @ts-ignore
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }

    getDefaultHeaders(): Headers {
        return this.defaultHeaders
    }

    async jsonFetch(url: string, init: RequestInit = {method: 'GET'}) {
        let response
        try {
            response = await fetch(`${this.host}${url}`, {
                ...init,
                headers: this.getDefaultHeaders(),
                
            })
        } catch(err) {
            // network error
            throw new Error('Network Error')
        }

        if (!response.ok) {
            throw new Error('Status Code error :' + response.statusText)
        }
    }

    async jsonPost(url: string, body: {}, init: Omit<RequestInit, 'body' | 'method'> = {} ) {
        return this.jsonFetch(url, {
            ...init,
            method: 'POST',
            body: JSON.stringify(body)
        })
    }


}

export default new ApiClient()