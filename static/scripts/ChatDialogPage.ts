import Block from "../src/modules/Block.js";
import {api, render} from "../src/modules/Utilits.js";
import {ChatItem, Message, User} from "../src/data/Contracts.js";
import {UserBlock} from "../src/modules/components/UserBlock/UserBlock.js";
import {NavTabsBlock} from "../src/modules/components/NavTabs/NavTabsBlock.js";
import {ChatListBlock} from "../src/modules/components/ChatListBlock/ChatList.js";
import {ChatItemBlock} from "../src/modules/components/ChatItemBlock/ChatItemBlock.js";
import {DialogNavBlock} from "../src/modules/components/DiaogNavBlock/DialogNavBlock.js";
import {MessageBlock} from "../src/modules/components/MessageBlock/MessageBlock.js";
import {DialogBlock} from "../src/modules/components/DialogBlock/DialogBlock.js";
import {MessageInputBlock} from "../src/modules/components/MessageInputBlock/MessageInputBlock.js";

let sideBar = new Block("aside", {classList: ["appSideBar"]})
let main = new Block("main", {})

api<User>('../api/userBlock.json').then(user => {
    const userBlock = new UserBlock(user)
    sideBar.element?.appendChild(userBlock.element!)
}).then(()=> {
    sideBar.element?.appendChild(new NavTabsBlock().element!)
}).then(()=> {
    api<ChatItem[]>('../src/api/chatList.json').then(chatList => {
        const chats = new ChatListBlock();
        chatList.forEach(chatItem=> {
            const chat = new ChatItemBlock({onClick: chats.onClick, ...chatItem})
            chats.children.push(chat)
            chats.element?.appendChild(chat.element!)
        })
        sideBar.element?.appendChild(chats.element!);
    })
});

api<{responder: User, messages: Message[]}>('../src/api/dialogWithCat.json').then(data => {
    const userBlock = new UserBlock(data.responder);
    const navBar = new DialogNavBlock({userBlock});
    const messages = data.messages.map(message => new MessageBlock({message, classList: message.isResponder? ["chatItemResponse"] : ["chatItem"]}));
    const dialog = new DialogBlock({messages});
    const app = new Block('div', {classList: ["appMain"]});
    app.element?.append(navBar.element!, dialog.element!, new MessageInputBlock().element!);
    const appWrapper = new Block('div', {classList: ["appWrapper"]})
    appWrapper.element?.append(app.element!)
    main.element?.append(appWrapper.element!);
})

render('root', sideBar.element!);
render('root', main.element!)
