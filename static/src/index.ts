import {Router} from "./modules/Router.js";
import {DialogPage} from "./pages/DialogPage/DialogPage.js";
import {SettingsPage} from "./pages/SettingsPage/SettingsPage.js";
import {useApi} from "./modules/Utilits.js";
import {AuthApi} from "./api/AuthApi.js";
import {LoginPage} from "./pages/LoginPage/LoginPage.js";
import {UserResponse} from "./data/Contracts.js";
import {RegisterPage} from "./pages/RegisterPage/RegisterPage.js";

const router = new Router("root");

router
    .use('/login', LoginPage)
    .use('/register', RegisterPage)
    .use('/', DialogPage)
    .use('/settings', SettingsPage)
    .start()

useApi<UserResponse>(AuthApi.get())
    .then(user => {
        if (!user) {
            router.go('/login')
        }
        router.go('/')
    })
    .catch(()=>router.go('/login'))

document.addEventListener('click', e=> {
    e.preventDefault();
    const target = e.target as HTMLLinkElement
    if(target.tagName === 'A') {
        router.go(`/${target.href.split('/').pop()!}`)
    }
})