import {HTTPTransport, METHODS} from "../modules/HTTPTransport.js";
import {SingUpRequest} from "../data/Contracts.js";

export class AuthApi extends HTTPTransport {

    static signUp = (data: SingUpRequest) => {
        return HTTPTransport.request('/auth/signup', {method: METHODS.POST, data})
    }

    static signIn = (data: SingUpRequest) => {
        return HTTPTransport.request('/auth/signin', {method: METHODS.POST, data})
    }

    static get = () => {
        return HTTPTransport.request('/auth/user', {method: METHODS.GET})
    }

    static logout = () => {
        return HTTPTransport.request('auth/logout', {method: METHODS.POST})
    }
}