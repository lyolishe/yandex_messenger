import {Router} from "./modules/Router";
import DialogPage from "./pages/DialogPage/DialogPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {Context} from "./modules/Context";
import './styles/index.less'

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