import { api } from "../src/modules/Utilits.js";
import { ChatListBlock } from "../src/components/ChatListBlock/ChatList.js";
import { ChatItemBlock } from "../src/components/ChatItemBlock/ChatItemBlock.js";
const render = (id, block) => {
    const target = document.getElementById(id);
    target === null || target === void 0 ? void 0 : target.appendChild(block);
};
api('../api/chatList.json').then(res => {
    const chatList = new ChatListBlock({ classList: ['chatList'] });
    res.forEach((chat) => {
        var _a;
        const chatItem = new ChatItemBlock(Object.assign(Object.assign({}, chat), { classList: [], onClick: chatList.onClick }));
        chatList.children.push(chatItem);
        (_a = chatList.element) === null || _a === void 0 ? void 0 : _a.appendChild(chatItem.element);
    });
    render('root', chatList.element);
});
//# sourceMappingURL=index.js.map