import Block from "../../modules/components/Block.js";
import {api, useApi} from "../../modules/Utilits.js";
import {ChatsResponse, Message, User, UserResponse} from "../../data/Contracts.js";
import {UserBlock} from "../../modules/blocks/UserBlock/UserBlock.js";
import {NavTabsBlock} from "../../modules/blocks/NavTabs/NavTabsBlock.js";
import {ChatListBlock} from "../../modules/blocks/ChatListBlock/ChatList.js";
import {ChatItemBlock} from "../../modules/blocks/ChatItemBlock/ChatItemBlock.js";
import {DialogBlock} from "../../modules/blocks/DialogBlock/DialogBlock.js";
import {MessageInputBlock} from "../../modules/blocks/MessageInputBlock/MessageInputBlock.js";
import {BlankDialogBlock} from "../../modules/blocks/BlankDialogBlock/BlankDialogBlock.js";
import {Page} from "../../modules/components/Page/Page.js";
import {AuthApi} from "../../api/AuthApi.js";
import {ChatsApi} from "../../api/ChatsApi.js";


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

    onPickDialog (chatId: string): void {
        this.menuItemId = chatId
        this.createChat()
    }

    setChats():void {
        this._getChats().then(chats => {
            const chatItems = chats.length?
                chats.map(chat => new ChatItemBlock({onClick: this.chats.onClick, setChats: this.setChats.bind(this), ...chat})) :
                [new Block('li', {}, 'No chats yet')];

            this.chats.setProps({...this.chats.props, children: chatItems})
        })
    }

    private _getChats(): Promise<ChatsResponse[]> {
        return useApi<ChatsResponse[]>(ChatsApi.getChats())
    }

    componentDidMount() {
        useApi<UserResponse>(AuthApi.get()).then(user => {
            return [new UserBlock(user, true), new NavTabsBlock()]
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

    show() {
        super.show();
        this.componentDidMount()
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