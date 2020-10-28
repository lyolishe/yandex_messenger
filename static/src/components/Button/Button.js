import Block from "../../modules/Block.js";
import { buttonTmpl } from "./ButtonTmpl.js";
export class Button extends Block {
    constructor(props) {
        super("button", props);
    }
    componentDidMount() {
        if (this.props.onClick && this.element) {
            this.element.onclick = this.props.onClick.bind(this);
        }
    }
    render() {
        const tmpl = buttonTmpl;
        return Handlebars.compile(tmpl)(this.props);
    }
}
//# sourceMappingURL=Button.js.map