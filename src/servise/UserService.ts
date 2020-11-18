import {useApi} from "../modules/Utilits.js";
import {AuthApi} from "../api/AuthApi.js";
import {Router, Routes} from "../modules/Router.js";
import {UserResponse} from "../types/Contracts.js";

export class UserService {
    static checkUser():Promise<UserResponse | void> {
        return useApi<UserResponse>(AuthApi.get())
            .catch(()=> {
                const currentRoute = window.location.pathname
                if (currentRoute == Routes.Settings || currentRoute == Routes.Chats) {
                    Router.instanse.go('/login')
                }
            })
    }
}