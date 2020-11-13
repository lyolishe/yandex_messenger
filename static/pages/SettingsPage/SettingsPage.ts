import {Page} from "../../src/modules/components/Page/Page.js";
import Block from "../../src/modules/components/Block.js";
import {useApi} from "../../src/modules/Utilits.js";
import {UserResponse} from "../../src/data/Contracts.js";
import {UserBlock} from "../../src/modules/blocks/UserBlock/UserBlock.js";
import {NavTabsBlock} from "../../src/modules/blocks/NavTabs/NavTabsBlock.js";
import {SettingItem, settingsList, SettingsList} from "../../src/modules/blocks/SettingsList/SettingsList.js";
import {createProfileSettings} from "./ProffileSettings.js";
import {AuthApi} from "../../src/api/AuthApi.js";

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

        useApi<UserResponse>(AuthApi.get()).then(user => {
            const userBlock = new UserBlock(user)
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