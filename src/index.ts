import {Router} from "./modules/Router.js";
import {DialogPage} from "./pages/DialogPage/DialogPage.js";
import {SettingsPage} from "./pages/SettingsPage/SettingsPage.js";
import {LoginPage} from "./pages/LoginPage/LoginPage.js";
import {RegisterPage} from "./pages/RegisterPage/RegisterPage.js";
import {Context} from "./modules/Context.js";

const router = new Router("root");
const context = new Context();

router
    .use('/login', LoginPage)
    .use('/register', RegisterPage)
    .use('/', DialogPage)
    .use('/settings', SettingsPage)
    .start()

context.set('user', null)

document.addEventListener('click', e=> {
    const target = e.target as HTMLLinkElement
    if(target.tagName === 'A') {
        e.preventDefault();
        router.go(`/${target.href.split('/').pop()!}`)
    }
})