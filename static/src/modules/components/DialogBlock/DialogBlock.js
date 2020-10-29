import Block from "../../Block.js";
export class DialogBlock extends Block {
    constructor(props) {
        super('div', Object.assign(Object.assign({}, props), { classList: ["dialog"] }));
    }
    componentDidMount() {
        var _a;
        const list = new Block('ul', { classList: ["messageList"] });
        this.props.messages.forEach(message => {
            var _a;
            (_a = list.element) === null || _a === void 0 ? void 0 : _a.appendChild(message.element);
        });
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.append(list.element);
    }
    render() {
        return super.render();
    }
}
//# sourceMappingURL=DialogBlock.js.map