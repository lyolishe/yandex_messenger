import Block from "../../modules/Block.js";
export class ChatListBlock extends Block {
    constructor(props) {
        super('ul', props);
        this.onClick = function (e) {
            this.children.forEach((elem) => {
                var _a;
                (_a = elem.element) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
        }.bind(this);
    }
}
//# sourceMappingURL=ChatList.js.map