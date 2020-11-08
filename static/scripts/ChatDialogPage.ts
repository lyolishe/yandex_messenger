/*
import Block from "../src/modules/components/Block.js";
import {api, render} from "../src/modules/Utilits.js";
import {ChatItem, Message, User} from "../src/data/Contracts.js";
import {UserBlock} from "../src/modules/blocks/UserBlock/UserBlock.js";
import {NavTabsBlock} from "../src/modules/blocks/NavTabs/NavTabsBlock.js";
import {ChatListBlock} from "../src/modules/blocks/ChatListBlock/ChatList.js";
import {ChatItemBlock} from "../src/modules/blocks/ChatItemBlock/ChatItemBlock.js";
import {DialogNavBlock} from "../src/modules/blocks/DiaogNavBlock/DialogNavBlock.js";
import {DialogBlock} from "../src/modules/blocks/DialogBlock/DialogBlock.js";
import {MessageInputBlock} from "../src/modules/blocks/MessageInputBlock/MessageInputBlock.js";

let sideBar = new Block("aside", {classList: ["appSideBar"]})
let main = new Block("main", {})

api<User>('../src/api/userBlock.json').then(user => {
    const userBlock = new UserBlock(user)
    sideBar.element?.appendChild(userBlock.element!)
}).then(()=> {
    sideBar.element?.appendChild(new NavTabsBlock().element!)
}).then(()=> {
    api<ChatItem[]>('../src/api/chatList.json').then(chatList => {
        const chats = new ChatListBlock();
        chats.setProps({children: chatList.map(chatItem => new ChatItemBlock({onClick: chats.onClick, ...chatItem}))})
        sideBar.element?.appendChild(chats.element);
    })
});

api<{responder: User, messages: Message[]}>('../src/api/dialogWithCat.json').then(data => {
    const userBlock = new UserBlock(data.responder);
    const navBar = new DialogNavBlock({userBlock});
    const dialog = new DialogBlock({messages: data.messages});
    const app = new Block('div', {classList: ["appMain"]});
    app.element?.append(navBar.element!, dialog.element!, new MessageInputBlock().element!);
    const appWrapper = new Block('div', {classList: ["appWrapper"]})
    appWrapper.element?.append(app.element!)
    main.element?.append(appWrapper.element!);
})

render('root', sideBar.element!);
render('root', main.element!)
*/
