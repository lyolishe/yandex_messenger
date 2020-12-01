import Block from '../../modules/components/Block';
import Page from '../../modules/components/Page/Page';
import NavTabsBlock from '../../modules/components/NavTabs/NavTabsBlock';
import SettingItem from '../../modules/components/SettingsList/SettingsItem';
import createProfileSettings from './ProffileSettings';
import UserService from '../../servise/UserService';
import { UserBlock } from '../../modules/components/UserBlock/UserBlock';
import { settingsList, SettingsList } from '../../modules/components/SettingsList/SettingsList';
import { Router } from '../../modules/Router';

export default class SettingsPage extends Page {
    menuItemId: string;

    sideBar: Block;

    main: Block;

    constructor() {
        super();
        this.menuItemId = 'profile';
        this.sideBar = new Block('aside', { classList: ['appSideBar'] });
        this.main = this.createMain();
    }

    onPickPoint(menuItemId: string): void {
        this.menuItemId = menuItemId;
        this.createMain();
    }

    componentDidMount(): void {
        UserService.checkUser().then((user) => {
            const userBlock = new UserBlock({ ...user, hasLogout: true });
            const settings = new SettingsList({ onPick: this.onPickPoint.bind(this) });
            settings.setProps({
                children: settingsList.map(
                    (point) => new SettingItem({ onClick: settings.onClick, ...point }),
                ),
            });
            this.sideBar.setProps({
                ...this.sideBar.props,
                children: [userBlock, new NavTabsBlock(), settings],
            });
            this.setProps({ children: [this.sideBar, this.main] });
        }).catch(() => {
            Router.instance.go('/login');
        });
    }

    createMain(): Block {
        switch (this.menuItemId) {
        default:
        case 'Profile':
            return createProfileSettings();
        }
    }
}
