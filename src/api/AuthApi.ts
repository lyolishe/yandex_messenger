import { HTTPTransport, METHODS } from './HTTPTransport';
import { SignInRequest, SingUpRequest } from '../types/Contracts';

export default class AuthApi {
    static signUp = (data: SingUpRequest): Promise<XMLHttpRequest> => HTTPTransport.request('/auth/signup', { method: METHODS.POST, data })

    static signIn = (data: SignInRequest): Promise<XMLHttpRequest> => HTTPTransport.request('/auth/signin', { method: METHODS.POST, data })

    static get = (): Promise<XMLHttpRequest> => HTTPTransport.request('/auth/user', {
        method: METHODS.GET,
        headers: {
            credentials: 'include',
        },
    })

    static logout = (): Promise<XMLHttpRequest> => HTTPTransport.request('/auth/logout', { method: METHODS.POST })
}
