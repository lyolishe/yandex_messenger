import Block from "../../Block.js";
import { buttonTmpl } from "./ButtonTmpl.js";
export class Button extends Block {
    constructor(props) {
        super("button", props);
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