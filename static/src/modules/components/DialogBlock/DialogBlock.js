import Block from "../../Block.js";
export class DialogBlock extends Block {
    constructor(props) {
        super('div', Object.assign(Object.assign({}, props), { classList: ["dialog"] }));
    }
    componentDidMount() {
        const list = new Block('ul', { classList: ["messageList"] });
        this.props.messages.forEach(message => {
            list.element.appendChild(message.element);
        });
        this.element.append(list.element);
    }
    render() {
        return super.render();
    }
}
//# sourceMappingURL=DialogBlock.js.map