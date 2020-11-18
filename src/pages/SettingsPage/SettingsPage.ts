import Block from "../../modules/components/Block.js";
import {useApi} from "../../modules/Utilits.js";
import {UserResponse} from "../../types/Contracts.js";
import {UserBlock} from "../../modules/components/UserBlock/UserBlock.js";
import {NavTabsBlock} from "../../modules/components/NavTabs/NavTabsBlock.js";
import {SettingItem, settingsList, SettingsList} from "../../modules/components/SettingsList/SettingsList.js";
import {createProfileSettings} from "./ProffileSettings.js";
import {AuthApi} from "../../api/AuthApi.js";

export class SettingsPage extends Block {
    menuItemId: string;
    sideBar: Block;
    main: Block;
    constructor() {
        super('div', {});
        this.menuItemId = 'profile'
        this.sideBar = new Block('aside', {classList: ["appSideBar"]});
        this.main = this.createMain();
    }

    onPickPoint (menuItemId: string) {
        this.menuItemId = menuItemId
        this.createMain();
    }

    componentDidMount() {

        useApi<UserResponse>(AuthApi.get()).then(user => {
            const userBlock = new UserBlock({...user, hasLogout:true})
            const settings = new SettingsList({onPick: this.onPickPoint.bind(this)});
            settings.setProps({children: settingsList.map(point => new SettingItem({onClick: settings.onClick, ...point}))})
            this.sideBar.setProps({...this.sideBar.props, children: [userBlock, new NavTabsBlock(), settings]})
            this.setProps({children: [this.sideBar, this.main]});
        })

    }

    createMain ():Block {
        switch (this.menuItemId) {
            default:
            case "Profile":
                return createProfileSettings();
        }
    }
}