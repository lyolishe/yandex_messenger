import {useApi} from "../modules/Utilits";
import {AuthApi} from "../api/AuthApi";
import {Router, Routes} from "../modules/Router";
import {UserResponse} from "../types/Contracts";

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