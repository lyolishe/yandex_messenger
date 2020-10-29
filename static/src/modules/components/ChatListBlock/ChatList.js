import Block from "../../Block.js";
export class ChatListBlock extends Block {
    constructor(props) {
        super('ul', Object.assign(Object.assign({}, props), { classList: ["chatList"] }));
        this.onClick = function onClick(e) {
            this.children.forEach((elem) => {
                var _a;
                (_a = elem.element) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
        }.bind(this);
    }
}
//# sourceMappingURL=ChatList.js.map