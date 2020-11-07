import Block from "../../Block.js";
import { chatItemTmpl } from "./ChatItemTmpl.js";
export class ChatItemBlock extends Block {
    constructor(props) {
        super("li", props);
        if (this.props.isActive) {
            this.element.classList.add('active');
        }
    }
    componentDidMount() {
        if (this.props.onClick) {
            this.element.onclick = this.props.onClick;
        }
    }
    render() {
        return Handlebars.compile(chatItemTmpl)(this.props);
    }
}
//# sourceMappingURL=ChatItemBlock.js.map