import Block from "../src/modules/Block.js";
import {api, render} from "../src/modules/Utilits.js";
import {ChatItem, User} from "../src/data/Contracts.js";
import {UserBlock} from "../src/modules/components/UserBlock/UserBlock.js";
import {NavTabsBlock} from "../src/modules/components/NavTabs/NavTabsBlock.js";
import {ChatListBlock} from "../src/modules/components/ChatListBlock/ChatList.js";
import {ChatItemBlock} from "../src/modules/components/ChatItemBlock/ChatItemBlock.js";
import {
    BlankDialogBlock,
    blankDialogPageInitProps
} from "../src/modules/components/BlankDialogBlock/BlankDialogBlock.js";

let sideBar = new Block("aside", {classList: ["appSideBar"]})
let main = new Block("main", {})



render('root', sideBar.element!);
render('root', main.element!)

api<User>('../api/userBlock.json').then(user => {
    const userBlock = new UserBlock(user)
    sideBar.element?.appendChild(userBlock.element!)
}).then(()=> {
    sideBar.element?.appendChild(new NavTabsBlock().element!)
}).then(()=> {
    api<ChatItem[]>('../api/chatList.json').then(chatList => {
        const chats = new ChatListBlock();
        chatList.forEach(chatItem=> {
            const chat = new ChatItemBlock({onClick: chats.onClick, ...chatItem})
            chats.children.push(chat)
            chats.element?.appendChild(chat.element!)
        })
        sideBar.element?.appendChild(chats.element!);
    })
});

const app = new Block('div', {classList: ["appMain"]});
const dialogBlock = new BlankDialogBlock(blankDialogPageInitProps)
app.element?.append(dialogBlock.element!)
const appWrapper = new Block('div', {classList: ["appWrapper"]})
appWrapper.element?.append(app.element!)
main.element?.append(appWrapper.element!);
