import Block from "../../components/Block.js";
import {api} from "../../Utilits.js";
import {ChatItem, Message, User} from "../../../data/Contracts.js";
import {UserBlock} from "../UserBlock/UserBlock.js";
import {NavTabsBlock} from "../NavTabs/NavTabsBlock.js";
import {ChatListBlock} from "../ChatListBlock/ChatList.js";
import {ChatItemBlock} from "../ChatItemBlock/ChatItemBlock.js";
import {DialogNavBlock} from "../DiaogNavBlock/DialogNavBlock.js";
import {DialogBlock} from "../DialogBlock/DialogBlock.js";
import {MessageInputBlock} from "../MessageInputBlock/MessageInputBlock.js";
import {BlankDialogBlock, blankDialogPageInitProps} from "../BlankDialogBlock/BlankDialogBlock.js";
import {Page} from "../../components/Page/Page.js";


export class DialogPage extends Page{
    constructor() {
        super({menuItemId: null});
        this.createPage()
    }

    onPickDialog (chatId: string) {
        this.setProps({menuItemId: chatId});
    }


    createPage() {
        const sideBar = new Block('aside', {classList: ["appSideBar"]}, `<children></children>`)
        const main = new Block('main', {}, `<children></children>`)
        this.setProps({children: [sideBar, main], ...this.props})

        api<User>('../src/api/userBlock.json').then(user => {
            return [new UserBlock(user), new NavTabsBlock()]
        }).then(([user, navTab]) => {
            api<ChatItem[]>('../src/api/chatList.json').then(chatList => {
                const chats = new ChatListBlock({onDialogPick: this.onPickDialog.bind(this)});
                chats.setProps({children: chatList.map(chatItem => new ChatItemBlock({onClick: chats.onClick, ...chatItem})), ...chats.props})
                sideBar.setProps({children: [user, navTab, chats], ...sideBar.props})
            })
            return sideBar
        }).then(() => {
            if (this.props.menuItemId) {
                api<{ responder: User, messages: Message[] }>(`../src/api/dialogWith${this.props.menuItemId}.json`).then(data => {
                    const userBlock = new UserBlock(data.responder);
                    const navBar = new DialogNavBlock({userBlock});
                    const dialog = new DialogBlock({messages: data.messages});
                    const app = new Block('div', {classList: ["appMain"], children: [navBar, dialog, new MessageInputBlock()]});
                    const appWrapper = new Block('div', {classList: ["appWrapper"], children: [app]})
                    main.setProps({...main.props, children:[appWrapper]})
                })
            } else {
                const dialogBlock = new BlankDialogBlock(blankDialogPageInitProps)
                const app = new Block('div', {classList: ["appMain"], children: [dialogBlock]});
                const appWrapper = new Block('div', {classList: ["appWrapper"], children: [app]})
                main.setProps({...main.props, children: [appWrapper]});
            }
        })
    }
}