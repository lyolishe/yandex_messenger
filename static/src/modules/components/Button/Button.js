import Block from "../../Block.js";
import { buttonTmpl } from "./ButtonTmpl.js";
export class Button extends Block {
    constructor(props) {
        var _a, _b;
        super("button", props);
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.setAttribute('form', props.form);
        (_b = this.element) === null || _b === void 0 ? void 0 : _b.setAttribute('type', props.type);
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