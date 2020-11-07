var _a, _b, _c;
import Block from "../src/modules/Block.js";
import { api, render } from "../src/modules/Utilits.js";
import { UserBlock } from "../src/modules/components/UserBlock/UserBlock.js";
import { NavTabsBlock } from "../src/modules/components/NavTabs/NavTabsBlock.js";
import { ChatListBlock } from "../src/modules/components/ChatListBlock/ChatList.js";
import { ChatItemBlock } from "../src/modules/components/ChatItemBlock/ChatItemBlock.js";
import { BlankDialogBlock, blankDialogPageInitProps } from "../src/modules/components/BlankDialogBlock/BlankDialogBlock.js";
let sideBar = new Block("aside", { classList: ["appSideBar"] });
let main = new Block("main", {});
api('../src/api/userBlock.json').then(user => {
    var _a;
    const userBlock = new UserBlock(user);
    (_a = sideBar.element) === null || _a === void 0 ? void 0 : _a.appendChild(userBlock.element);
}).then(() => {
    var _a;
    (_a = sideBar.element) === null || _a === void 0 ? void 0 : _a.appendChild(new NavTabsBlock().element);
}).then(() => {
    api('../src/api/chatList.json').then(chatList => {
        var _a;
        const chats = new ChatListBlock();
        chatList.forEach(chatItem => {
            var _a;
            const chat = new ChatItemBlock(Object.assign({ onClick: chats.onClick }, chatItem));
            chats.children.push(chat);
            (_a = chats.element) === null || _a === void 0 ? void 0 : _a.appendChild(chat.element);
        });
        (_a = sideBar.element) === null || _a === void 0 ? void 0 : _a.appendChild(chats.element);
    });
});
const app = new Block('div', { classList: ["appMain"] });
const dialogBlock = new BlankDialogBlock(blankDialogPageInitProps);
(_a = app.element) === null || _a === void 0 ? void 0 : _a.append(dialogBlock.element);
const appWrapper = new Block('div', { classList: ["appWrapper"] });
(_b = appWrapper.element) === null || _b === void 0 ? void 0 : _b.append(app.element);
(_c = main.element) === null || _c === void 0 ? void 0 : _c.append(appWrapper.element);
render('root', sideBar.element);
render('root', main.element);
//# sourceMappingURL=ChatListPage.js.map