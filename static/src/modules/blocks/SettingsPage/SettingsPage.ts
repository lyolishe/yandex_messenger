import {Page} from "../../components/Page/Page.js";
import Block from "../../components/Block.js";
import {api} from "../../Utilits.js";
import {User} from "../../../data/Contracts.js";
import {UserBlock} from "../UserBlock/UserBlock.js";
import {NavTabsBlock} from "../NavTabs/NavTabsBlock.js";
import {SettingItem, settingsList, SettingsList} from "../SettingsList/SettingsList.js";
import {createProfileSettings} from "./ProffileSettings.js";

export class SettingsPage extends Page {
    menuItemId: string;
    constructor() {
        super();
        this.menuItemId = 'profile'
    }

    onPickPoint (menuItemId: string) {
        this.menuItemId = menuItemId
        this.createMain();
    }

    componentDidMount() {
        const sideBar = new Block('aside', {classList: ["appSideBar"]})
        const main = this.createMain()

        api<User>('../src/api/userBlock.json').then(user => {
            const userBlock = new UserBlock(user)
            const settings = new SettingsList({onPick: this.onPickPoint.bind(this)});
            settings.setProps({children: settingsList.map(point => new SettingItem({onClick: settings.onClick, ...point}))})
            sideBar.setProps({...sideBar.props, children: [userBlock, new NavTabsBlock(), settings]})
            this.setProps({children: [sideBar, main]});
        })

    }

    createMain () {
        switch (this.menuItemId) {
            default:
            case "Profile":
                return createProfileSettings();
        }
    }
}