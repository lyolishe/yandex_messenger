export enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

export interface HTTPTransportOptions {
    timeout?: number;
    data?: any;
    headers?: Record<string, string>
    method: METHODS;
}

export const apiBasePath = 'https://ya-praktikum.tech/api/v2';

export class HTTPTransport {
    static request = (
        url: string,
        options:HTTPTransportOptions,
        timeout = 5000,
    ): Promise<XMLHttpRequest> => {
        const { data, headers, method } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, apiBasePath + url);
            xhr.withCredentials = true;
            xhr.timeout = timeout;
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.setRequestHeader('accept', 'application/json');
            if (headers) {
                for (const key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        xhr.setRequestHeader(key, headers[key]);
                    }
                }
            }

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
