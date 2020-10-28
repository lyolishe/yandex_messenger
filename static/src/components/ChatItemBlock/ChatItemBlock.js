import Block from "../../modules/Block.js";
import { chatItemTmpl } from "./ChatItemTmpl.js";
export class ChatItemBlock extends Block {
    constructor(props) {
        super("li", props);
    }
    componentDidMount() {
        if (this.props.onClick && this.element) {
            this.element.onclick = this.props.onClick;
        }
    }
    render() {
        const tmpl = chatItemTmpl;
        return Handlebars.compile(tmpl)(this.props);
    }
}
//# sourceMappingURL=ChatItemBlock.js.map