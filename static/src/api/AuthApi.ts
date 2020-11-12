import {HTTPTransport, METHODS} from "../modules/HTTPTransport.js";
import {SingUpRequest} from "../data/Contracts.js";

export class AuthApi extends HTTPTransport {

    static signUp = (data: SingUpRequest) => {
        return HTTPTransport.request('/auth/signup', {method: METHODS.POST, data, headers: {
                'content-type':'application/json',
            }}
        )
    }

    static signIn = (data: SingUpRequest) => {
        return HTTPTransport.request('/auth/signin', {method: METHODS.POST, data, headers: {
                'content-type':'application/json',
            }}
        )
    }

    static get = () => {
        return HTTPTransport.request('/auth/user', {method: METHODS.GET, headers: {
                'accept':'application/json',
                'credentials': 'include',
            }})
    }

    static logout = () => {
        return HTTPTransport.request('auth/logout', {method: METHODS.POST})
    }
}