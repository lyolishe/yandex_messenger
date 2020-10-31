import Block from "../../Block.js";
import { buttonTmpl } from "./ButtonTmpl.js";
export class Button extends Block {
    constructor(props) {
        var _a;
        super("button", props);
        this.element.setAttribute('form', props.form);
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.setAttribute('type', props.type);
    }
    componentDidMount() {
        if (this.props.onClick && this.element) {
            this.element.onclick = this.props.onClick;
        }
    }
    render() {
        return Handlebars.compile(buttonTmpl)(this.props);
    }
}
//# sourceMappingURL=Button.js.map