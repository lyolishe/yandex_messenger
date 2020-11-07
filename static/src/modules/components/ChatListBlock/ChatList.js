import Block from "../../Block.js";
export class ChatListBlock extends Block {
    constructor(props) {
        super('ul', Object.assign(Object.assign({}, props), { classList: ["chatList"] }));
        this.onClick = function onClick(e) {
            this.children.forEach((elem) => {
                elem.element.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
        }.bind(this);
    }
}
//# sourceMappingURL=ChatList.js.map