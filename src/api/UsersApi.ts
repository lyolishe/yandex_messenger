import { HTTPTransport, METHODS } from './HTTPTransport';
import { ChangePasswordRequest, FindUserRequest, UserRequest } from '../types/Contracts';

export default class UsersApi {
    static changeProfile = (data: UserRequest): Promise<XMLHttpRequest> => HTTPTransport.request('/user/profile', { method: METHODS.PUT, data })

    static changeAvatar = (data: FormData): Promise<XMLHttpRequest> => HTTPTransport.request('/user/profile/avatar', {
        method: METHODS.PUT,
        data,
        headers: {
            'content-type': 'multipart/form-data',
        },
    })

    static changePassword = (data: ChangePasswordRequest): Promise<XMLHttpRequest> => HTTPTransport.request('/user/password', { method: METHODS.PUT, data })

    static getUser = (id: number): Promise<XMLHttpRequest> => HTTPTransport.request(`/user/${id}`, { method: METHODS.GET })

    static search = (data: FindUserRequest): Promise<XMLHttpRequest> => HTTPTransport.request('/user/search', { method: METHODS.POST, data });
}
