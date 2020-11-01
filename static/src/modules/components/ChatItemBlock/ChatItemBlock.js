import Block from "../../Block.js";
import { chatItemTmpl } from "./ChatItemTmpl.js";
export class ChatItemBlock extends Block {
    constructor(props) {
        var _a;
        super("li", props);
        if (this.props.isActive) {
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.classList.add('active');
        }
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