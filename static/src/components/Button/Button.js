import Block from "../../modules/Block.js";
import { ButtonTmpl } from "./Button.tmpl.js";
export class Button extends Block {
    constructor(props) {
        super("button", props);
    }
    componentDidMount() {
        var _a;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.classList.add(`btn`, `btn${this.props.buttonType}`);
        if (this.props.onClick && this.element) {
            this.element.onclick = this.props.onClick.bind(this);
        }
    }
    render() {
        const tmpl = ButtonTmpl;
        return Handlebars.compile(tmpl)(this.props);
    }
}
//# sourceMappingURL=Button.js.map