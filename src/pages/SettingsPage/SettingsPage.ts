import Block from "../../modules/components/Block.js";
import {UserBlock} from "../../modules/components/UserBlock/UserBlock.js";
import {NavTabsBlock} from "../../modules/components/NavTabs/NavTabsBlock.js";
import {SettingItem, settingsList, SettingsList} from "../../modules/components/SettingsList/SettingsList.js";
import {createProfileSettings} from "./ProffileSettings.js";
import {Page} from "../../modules/components/Page/Page.js";
import {Router} from "../../modules/Router.js";
import {UserService} from "../../servise/UserService.js";

export class SettingsPage extends Page {
    menuItemId: string;
    sideBar: Block;
    main: Block;
    constructor() {
        super();
        this.menuItemId = 'profile'
        this.sideBar = new Block('aside', {classList: ["appSideBar"]});
        this.main = this.createMain();
    }

    onPickPoint (menuItemId: string) {
        this.menuItemId = menuItemId
        this.createMain();
    }

    componentDidMount() {

        UserService.checkUser().then(user => {
            const userBlock = new UserBlock({...user, hasLogout:true})
            const settings = new SettingsList({onPick: this.onPickPoint.bind(this)});
            settings.setProps({children: settingsList.map(point => new SettingItem({onClick: settings.onClick, ...point}))})
            this.sideBar.setProps({...this.sideBar.props, children: [userBlock, new NavTabsBlock(), settings]})
            this.setProps({children: [this.sideBar, this.main]});
        }).catch(() => Router.instanse.go('/login'))

    }

    createMain ():Block {
        switch (this.menuItemId) {
            default:
            case "Profile":
                return createProfileSettings();
        }
    }
}