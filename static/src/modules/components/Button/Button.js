import Block from "../../Block.js";
import { buttonTmpl } from "./ButtonTmpl.js";
export class Button extends Block {
    constructor(props) {
        super("button", props);
        this.element.setAttribute('form', props.form);
        this.element.setAttribute('type', props.type);
    }
    componentDidMount() {
        if (this.props.onClick) {
            this.element.onclick = this.props.onClick;
        }
    }
    render() {
        return Handlebars.compile(buttonTmpl)(this.props);
    }
}
//# sourceMappingURL=Button.js.map