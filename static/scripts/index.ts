import {ChatItem} from "../src/data/Contracts.js";
import {api} from "../src/modules/Utilits.js";
import {ChatListBlock} from "../src/components/ChatListBlock/ChatList.js";
import {ChatItemBlock} from "../src/components/ChatItemBlock/ChatItemBlock.js";

const render = (id: string, block: HTMLElement ): void => {
    const target = document.getElementById(id);
    target?.appendChild(block);
}

api<ChatItem[]>('../api/chatList.json').then(res => {
    const chatList = new ChatListBlock({classList: ['chatList']});
    res.forEach((chat) => {
        const chatItem = new ChatItemBlock({...chat, classList: [], onClick: chatList.onClick})
        chatList.children.push(chatItem);
        chatList.element?.appendChild(chatItem.element!);
    })
    render('root', chatList.element!)
})