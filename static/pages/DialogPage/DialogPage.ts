import Block from "../../src/modules/components/Block.js";
import {api, useApi} from "../../src/modules/Utilits.js";
import {ChatsResponse, Message, User, UserResponse} from "../../src/data/Contracts.js";
import {UserBlock} from "../../src/modules/blocks/UserBlock/UserBlock.js";
import {NavTabsBlock} from "../../src/modules/blocks/NavTabs/NavTabsBlock.js";
import {ChatListBlock} from "../../src/modules/blocks/ChatListBlock/ChatList.js";
import {ChatItemBlock} from "../../src/modules/blocks/ChatItemBlock/ChatItemBlock.js";
import {DialogBlock} from "../../src/modules/blocks/DialogBlock/DialogBlock.js";
import {MessageInputBlock} from "../../src/modules/blocks/MessageInputBlock/MessageInputBlock.js";
import {BlankDialogBlock, blankDialogPageInitProps} from "../../src/modules/blocks/BlankDialogBlock/BlankDialogBlock.js";
import {Page} from "../../src/modules/components/Page/Page.js";
import {AuthApi} from "../../src/api/AuthApi.js";
import {ChatsApi} from "../../src/api/ChatsApi.js";


export class DialogPage extends Page{
    menuItemId: string
    constructor() {
        super();
    }

    onPickDialog (chatId: string) {
        this.menuItemId = chatId
        this.createChat()
    }

    componentDidMount() {
        const sideBar = new Block('aside', {classList: ["appSideBar"]})
        const main = new Block('main', {})

        useApi<UserResponse>(AuthApi.get()).then(user => {
            return [new UserBlock(user), new NavTabsBlock()]
        }).then(([user, navTab]) => {
            useApi<ChatsResponse[]>(ChatsApi.getChats()).then(chatList => {
                const chats = new ChatListBlock({onDialogPick: this.onPickDialog.bind(this)});
                const chatItems: Block[] = chatList.length?
                    chatList.map(chatItem => new ChatItemBlock({onClick: chats.onClick, ...chatItem})) :
                    [new Block('li', {}, 'No chats yet')];
                chats.setProps({children: chatItems, ...chats.props})
                sideBar.setProps({...sideBar.props, children: [user, navTab, chats]})
            })
        }).then(() => {
            if (this.menuItemId) {
                api<{ responder: User, messages: Message[] }>(`../src/api/dialogWith${this.menuItemId}.json`).then(data => {
                    //const userBlock = new UserBlock(data.responder);
                    //const navBar = new DialogNavBlock({userBlock});
                    const dialog = new DialogBlock({messages: data.messages});
                    const app = new Block('div', {classList: ["appMain"], children: [/*navBar,*/ dialog, new MessageInputBlock()]});
                    const appWrapper = new Block('div', {classList: ["appWrapper"], children: [app]})
                    main.setProps({...main.props, children:[appWrapper]})
                    this.setProps({...this.props, children: [sideBar, main]})
                })
            } else {
                const dialogBlock = new BlankDialogBlock(blankDialogPageInitProps)
                const app = new Block('div', {classList: ["appMain"], children: [dialogBlock]});
                const appWrapper = new Block('div', {classList: ["appWrapper"], children: [app]})
                main.setProps({...main.props, children: [appWrapper]});
                this.setProps({...this.props, children: [sideBar, main]})
            }
        })
    }


    createChat() {
        const main = this.props.children?.[1]!
        this.menuItemId && api<{ responder: User, messages: Message[] }>(`../src/api/dialogWith${this.menuItemId}.json`).then(data => {
            //const userBlock = new UserBlock(data.responder);
            //const navBar = new DialogNavBlock({userBlock});
            const dialog = new DialogBlock({messages: data.messages});
            const app = new Block('div', {classList: ["appMain"], children: [/*navBar,*/ dialog, new MessageInputBlock()]});
            const appWrapper = new Block('div', {classList: ["appWrapper"], children: [app]})
            main.setProps({...main.props, children:[appWrapper]})
        })
    }
}