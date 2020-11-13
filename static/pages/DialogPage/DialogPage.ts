import Block from "../../src/modules/components/Block.js";
import {api, useApi} from "../../src/modules/Utilits.js";
import {ChatsResponse, Message, User, UserResponse} from "../../src/data/Contracts.js";
import {UserBlock} from "../../src/modules/blocks/UserBlock/UserBlock.js";
import {NavTabsBlock} from "../../src/modules/blocks/NavTabs/NavTabsBlock.js";
import {ChatListBlock} from "../../src/modules/blocks/ChatListBlock/ChatList.js";
import {ChatItemBlock} from "../../src/modules/blocks/ChatItemBlock/ChatItemBlock.js";
import {DialogBlock} from "../../src/modules/blocks/DialogBlock/DialogBlock.js";
import {MessageInputBlock} from "../../src/modules/blocks/MessageInputBlock/MessageInputBlock.js";
import {BlankDialogBlock} from "../../src/modules/blocks/BlankDialogBlock/BlankDialogBlock.js";
import {Page} from "../../src/modules/components/Page/Page.js";
import {AuthApi} from "../../src/api/AuthApi.js";
import {ChatsApi} from "../../src/api/ChatsApi.js";


export class DialogPage extends Page{
    menuItemId: string
    sidebar: Block;
    main: Block;
    chats: ChatListBlock;
    constructor() {
        super();
        this.sidebar = new Block('aside', {classList: ["appSideBar"]})
        this.main = new Block('main', {})
        this.chats = new ChatListBlock({onDialogPick: this.onPickDialog.bind(this)});
    }

    onPickDialog (chatId: string) {
        this.menuItemId = chatId
        this.createChat()
    }

    setChats() {
        this._getChats().then(chats => {
            const chatItems = chats.length?
                chats.map(chat => new ChatItemBlock({onClick: this.chats.onClick, ...chat})) :
                [new Block('li', {}, 'No chats yet')];

            this.chats.setProps({...this.chats.props, children: chatItems})
        })
    }

    private _getChats() {
        return useApi<ChatsResponse[]>(ChatsApi.getChats())
    }

    componentDidMount() {

        useApi<UserResponse>(AuthApi.get()).then(user => {
            return [new UserBlock(user), new NavTabsBlock()]
        }).then(([user, navTab]) => {
            this.setChats()
            this.sidebar.setProps({children: [user, navTab, this.chats]})

            if (this.menuItemId) {
                api<{ responder: User, messages: Message[] }>(`../src/api/dialogWith${this.menuItemId}.json`).then(data => {
                    //const userBlock = new UserBlock(data.responder);
                    //const navBar = new DialogNavBlock({userBlock});
                    const dialog = new DialogBlock({messages: data.messages});
                    const app = new Block('div', {classList: ["appMain"], children: [/*navBar,*/ dialog, new MessageInputBlock()]});
                    const appWrapper = new Block('div', {classList: ["appWrapper"], children: [app]})
                    this.main.setProps({...this.main.props, children:[appWrapper]})
                    this.setProps({...this.props, children: [this.sidebar, this.main]})
                })
            } else {
                const dialogBlock = new BlankDialogBlock(this.setChats.bind(this))
                const app = new Block('div', {classList: ["appMain"], children: [dialogBlock]});
                const appWrapper = new Block('div', {classList: ["appWrapper"], children: [app]})
                this.main.setProps({...this.main.props, children: [appWrapper]});
                this.setProps({...this.props, children: [this.sidebar, this.main]})
            }
        })
    }


    createChat() {
        this.menuItemId && api<{ responder: User, messages: Message[] }>(`../src/api/dialogWith${this.menuItemId}.json`).then(data => {
            //const userBlock = new UserBlock(data.responder);
            //const navBar = new DialogNavBlock({userBlock});
            const dialog = new DialogBlock({messages: data.messages});
            const app = new Block('div', {classList: ["appMain"], children: [/*navBar,*/ dialog, new MessageInputBlock()]});
            const appWrapper = new Block('div', {classList: ["appWrapper"], children: [app]})
            this.main.setProps({children:[appWrapper]})
        })
    }
}