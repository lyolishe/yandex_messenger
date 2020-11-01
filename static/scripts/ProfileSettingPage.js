var _a, _b, _c, _d, _e, _f, _g, _h, _j;
import { Wrapper } from "../src/modules/components/Wrapper.js";
import { ChangeAvatar } from "../src/modules/components/ChangeAvatar/ChangeAvatar.js";
import { ChangePasswordForm, ProfileSettingsForms } from "../src/modules/components/ProfileForm/ProfileForms.js";
import Block from "../src/modules/Block.js";
import { api, render } from "../src/modules/Utilits.js";
import { UserBlock } from "../src/modules/components/UserBlock/UserBlock.js";
import { NavTabsBlock } from "../src/modules/components/NavTabs/NavTabsBlock.js";
import { SettingItem, SettingsList, settingsList } from "../src/modules/components/SettingsList/SettingsList.js";
let sideBar = new Block("aside", { classList: ["appSideBar"] });
let main = new Block("main", {});
const appWrapper = new Wrapper({ classList: ['appMainWrap'] });
const appManin = new Wrapper({ classList: ['appMain'] });
api('../src/api/userBlock.json').then(user => {
    var _a;
    const userBlock = new UserBlock(user);
    (_a = sideBar.element) === null || _a === void 0 ? void 0 : _a.appendChild(userBlock.element);
}).then(() => {
    var _a;
    (_a = sideBar.element) === null || _a === void 0 ? void 0 : _a.appendChild(new NavTabsBlock().element);
}).then(() => {
    var _a;
    const settings = new SettingsList();
    settingsList.forEach(settingItem => {
        var _a;
        const setting = new SettingItem(Object.assign(Object.assign({}, settingItem), { onClick: settings.onClick }));
        settings.children.push(setting);
        (_a = settings.element) === null || _a === void 0 ? void 0 : _a.appendChild(setting.element);
    });
    (_a = sideBar.element) === null || _a === void 0 ? void 0 : _a.appendChild(settings.element);
});
const formsWrapper = new Wrapper({
    classList: ["row", "myAuto"],
    layers: [
        new Wrapper({ classList: ["col", "mxAuto"] }),
        new Wrapper({ classList: ["card"] }),
        new Wrapper({ classList: ["cardBody"] }),
    ]
});
const changePasswordColumn = new Wrapper({ classList: ["col-6"] });
const profileSettingsColumn = new Wrapper({ classList: ["col-6"] });
(_a = changePasswordColumn.element) === null || _a === void 0 ? void 0 : _a.appendChild(new ChangeAvatar({}).element);
(_b = changePasswordColumn.element) === null || _b === void 0 ? void 0 : _b.appendChild(new ChangePasswordForm({ id: 'ChangePassword' }).element);
(_c = profileSettingsColumn.element) === null || _c === void 0 ? void 0 : _c.appendChild(new ProfileSettingsForms({ id: "ProfileSettings" }).element);
const formRow = new Wrapper({ classList: ["row"] });
(_d = formRow.element) === null || _d === void 0 ? void 0 : _d.appendChild(changePasswordColumn.element);
(_e = formRow.element) === null || _e === void 0 ? void 0 : _e.appendChild(profileSettingsColumn.element);
formsWrapper.lastLayer.appendChild(formRow.element);
const nav = new Block('nav', { classList: ["navbar"] });
(_f = nav.element) === null || _f === void 0 ? void 0 : _f.appendChild(new UserBlock({ firstName: "Profile" }).element);
(_g = appManin.element) === null || _g === void 0 ? void 0 : _g.appendChild(nav.element);
(_h = appManin.element) === null || _h === void 0 ? void 0 : _h.appendChild(formsWrapper.element);
appWrapper.lastLayer.appendChild(appManin.element);
(_j = main.element) === null || _j === void 0 ? void 0 : _j.appendChild(appWrapper.element);
render('root', sideBar.element);
render('root', main.element);
//# sourceMappingURL=ProfileSettingPage.js.map