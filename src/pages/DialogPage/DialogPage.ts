import Block from '../../modules/components/Block';
import ChatsApi from '../../api/ChatsApi';
import Page from '../../modules/components/Page/Page';
import { useApi } from '../../modules/Utilits';
import { ChatsResponse } from '../../types/Contracts';
import { UserBlock } from '../../modules/components/UserBlock/UserBlock';
import NavTabsBlock from '../../modules/components/NavTabs/NavTabsBlock';
import ChatListBlock from '../../modules/components/ChatListBlock/ChatList';
import { ChatItemBlock } from '../../modules/components/ChatItemBlock/ChatItemBlock';
import { BlankDialogBlock } from '../../modules/components/BlankDialogBlock/BlankDialogBlock';
import { Router } from '../../modules/Router';
import { UserService } from '../../servise/UserService';

export default class DialogPage extends Page {
    menuItemId: string

    sidebar: Block;

    main: Block;

    chats: ChatListBlock;

    constructor() {
        super();
        this.sidebar = new Block('aside', { classList: ['appSideBar'] });
        this.main = new Block('main', {});
        this.chats = new ChatListBlock({ onDialogPick: this.onPickDialog.bind(this) });
    }

    onPickDialog(chatId: string): void {
        this.menuItemId = chatId;
        this.createChat();
    }

    setChats(): void {
        DialogPage._getChats().then((chats) => {
            const chatItems = chats.length
                ? chats.map(
                    (chat) => new ChatItemBlock({
                        onClick: this.chats.onClick,
                        setChats: this.setChats.bind(this),
                        ...chat,
                    }),
                )
                : [new Block('li', {}, 'No chats yet')];

            this.chats.setProps({ ...this.chats.props, children: chatItems });
        });
    }

    private static _getChats(): Promise<ChatsResponse[]> {
        return useApi<ChatsResponse[]>(ChatsApi.getChats());
    }

    componentDidMount(): void {
        UserService.checkUser().then(
            (user) => [
                new UserBlock({ ...user, hasLogout: true }),
                new NavTabsBlock(),
            ],
        ).then(([user, navTab]) => {
            this.setChats();
            this.sidebar.setProps({ children: [user, navTab, this.chats] });

            const dialogBlock = new BlankDialogBlock(this.setChats.bind(this));
            const app = new Block('div', { classList: ['appMain'], children: [dialogBlock] });
            const appWrapper = new Block('div', { classList: ['appWrapper'], children: [app] });
            this.main.setProps({ ...this.main.props, children: [appWrapper] });
            this.setProps({ ...this.props, children: [this.sidebar, this.main] });
        }).catch(() => {
            Router.instanse.go('/login');
        });
    }

    show(): void {
        super.show();
        this.componentDidMount();
    }

    // TODO: Сделать метод для отображения чатиков
    createChat(): void {
        return undefined;
    }
}
