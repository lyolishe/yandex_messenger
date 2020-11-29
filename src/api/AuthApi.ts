import {HTTPTransport, METHODS} from "../modules/HTTPTransport";
import {SignInRequest, SingUpRequest} from "../types/Contracts";

export class AuthApi {

    static signUp = (data: SingUpRequest) => {
        return HTTPTransport.request('/auth/signup', {method: METHODS.POST, data})
    }

    static signIn = (data: SignInRequest) => {
        return HTTPTransport.request('/auth/signin', {method: METHODS.POST, data})
    }

    static get = () => {
        return HTTPTransport.request('/auth/user', {method: METHODS.GET, headers: {
                'credentials': 'include',
            }
        })
    }

    static logout = () => {
        return HTTPTransport.request('/auth/logout', {method: METHODS.POST})
    }
}