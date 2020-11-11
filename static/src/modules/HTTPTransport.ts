import {StringIndexed} from "./Utilits.js";

export enum METHODS {GET = "GET", PUT = "PUT", POST = "POST", DELETE = "Delete"}

export interface HTTPTransportOptions {
    timeout?: number;
    data?: StringIndexed;
    headers?: Record<string, string>
    method: METHODS;
}
export const apiBasePath = `https://ya-praktikum.tech/api/v2`;

export class HTTPTransport {

    static request = (url: string, options:HTTPTransportOptions, timeout = 5000): Promise<XMLHttpRequest> => {
        const {data, headers, method} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest;

            xhr.open(method, apiBasePath+url);
            xhr.timeout = timeout;
            if(headers){
                for (let key in headers) {
                    xhr.setRequestHeader(key, headers[key])
                }
            }


            xhr.onload = ()=> {
                resolve(xhr)
            }

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject

            if (method === METHODS.GET || method === METHODS.DELETE || !data) {
                xhr.send()
            } else {
                xhr.send(JSON.stringify(data))
            }
        })

    };
}