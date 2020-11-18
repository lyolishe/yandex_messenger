import {HTTPTransport, METHODS} from "../modules/HTTPTransport.js";
import {ChangePasswordRequest, FindUserRequest, UserRequest} from "../types/Contracts.js";

export class UsersApi {
    static changeProfile = (data: UserRequest) => {
        return HTTPTransport.request('/user/profile', {method: METHODS.PUT, data})
    }

    static changeAvatar = (data: FormData) => {
        return HTTPTransport.request('/user/profile/avatar', {method: METHODS.PUT, data})
    }

    static changePassword = (data: ChangePasswordRequest) => {
        return HTTPTransport.request('/user/password', {method: METHODS.PUT, data})
    }

    static getUser = (id: number) => {
        return HTTPTransport.request(`/user/${id}`, {method: METHODS.GET})
    }

    static search = (data: FindUserRequest) => {
        return HTTPTransport.request('/user/search', {method: METHODS.POST, data});
    }
}