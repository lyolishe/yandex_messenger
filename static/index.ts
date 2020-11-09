import {Router} from "./src/modules/Router.js";
import {DialogPage} from "./src/modules/blocks/DialogPage/DialogPage.js";
import {SettingsPage} from "./src/modules/blocks/SettingsPage/SettingsPage.js";

const router = new Router("root");

router
    .use('/', DialogPage)
    .use('/settings', SettingsPage)
    .start()

document.addEventListener('click', e=> {
    e.preventDefault();
    const target = e.target as HTMLLinkElement
    if(target.tagName === 'A') {
        router.go(`/${target.href.split('/').pop()!}`)
    }
})