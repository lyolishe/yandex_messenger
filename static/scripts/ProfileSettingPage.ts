import {Wrapper} from "../src/modules/components/Wrapper.js";
import {ChangeAvatar} from "../src/modules/components/ChangeAvatar/ChangeAvatar.js";
import {ChangePasswordForm, ProfileSettingsForms} from "../src/modules/components/ProfileForm/ProfileForms.js";
import Block from "../src/modules/Block.js";
import {api, render} from "../src/modules/Utilits.js";
import {User} from "../src/data/Contracts.js";
import {UserBlock} from "../src/modules/components/UserBlock/UserBlock.js";
import {NavTabsBlock} from "../src/modules/components/NavTabs/NavTabsBlock.js";
import {SettingItem, SettingsList, settingsList} from "../src/modules/components/SettingsList/SettingsList.js";


let sideBar = new Block("aside", {classList: ["appSideBar"]})
let main = new Block("main", {})
const appWrapper = new Wrapper({classList: ['appMainWrap']})
const appManin = new Wrapper({classList: ['appMain']})

api<User>('../src/api/userBlock.json').then(user => {
    const userBlock = new UserBlock(user)
    sideBar.element?.appendChild(userBlock.element!)
}).then(()=> {
    sideBar.element?.appendChild(new NavTabsBlock().element!)
}).then(()=>{
    const settings = new SettingsList()
    settingsList.forEach(settingItem=> {
        const setting = new SettingItem({...settingItem, onClick: settings.onClick});
        settings.children.push(setting)
        settings.element?.appendChild(setting.element!)
    })
    sideBar.element?.appendChild(settings.element!);
})

const formsWrapper = new Wrapper({
    classList:["row", "myAuto"],
    layers:[
        new Wrapper( {classList: ["col", "mxAuto"]}),
        new Wrapper({classList: ["card"]}),
        new Wrapper({classList: ["cardBody"]}),
    ]
})

const changePasswordColumn = new Wrapper({classList: ["col-6"]})
const profileSettingsColumn = new Wrapper({classList: ["col-6"]})
changePasswordColumn.element?.appendChild(new ChangeAvatar({}).element!)
changePasswordColumn.element?.appendChild(new ChangePasswordForm({id: 'ChangePassword'}).element!)
profileSettingsColumn.element?.appendChild(new ProfileSettingsForms({id: "ProfileSettings"}).element!)
const formRow = new Wrapper({classList: ["row"]})
formRow.element?.appendChild(changePasswordColumn.element!);
formRow.element?.appendChild(profileSettingsColumn.element!);


formsWrapper.lastLayer.appendChild(formRow.element!)

const nav = new Block('nav', {classList: ["navbar"]})
nav.element?.appendChild(new UserBlock({firstName: "Profile"}).element!);

appManin.element?.appendChild(nav.element!);
appManin.element?.appendChild(formsWrapper.element!);
appWrapper.lastLayer.appendChild(appManin.element!)

main.element?.appendChild(appWrapper.element!);

render('root', sideBar.element!);
render('root', main.element!);