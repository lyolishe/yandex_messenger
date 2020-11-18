import {Router} from "./modules/Router.js";
import {DialogPage} from "./pages/DialogPage/DialogPage.js";
import {SettingsPage} from "./pages/SettingsPage/SettingsPage.js";
import {useApi} from "./modules/Utilits.js";
import {AuthApi} from "./api/AuthApi.js";
import {LoginPage} from "./pages/LoginPage/LoginPage.js";
import {UserResponse} from "./types/Contracts.js";
import {RegisterPage} from "./pages/RegisterPage/RegisterPage.js";
import {Context} from "./modules/Context.js";

const router = new Router("root");
const context = new Context()
router
    .use('/login', LoginPage)
    .use('/register', RegisterPage)
    .use('/', DialogPage)
    .use('/settings', SettingsPage)
    .start()

useApi<UserResponse>(AuthApi.get())
    .then(user => {
        if (!user.id) {
            router.go('/login')
            return;
        }
        context.set('user', user);
        router.go('/')
    })
    .catch(()=>router.go('/login'))

document.addEventListener('click', e=> {
    const target = e.target as HTMLLinkElement
    if(target.tagName === 'A') {
        e.preventDefault();
        router.go(`/${target.href.split('/').pop()!}`)
    }
})