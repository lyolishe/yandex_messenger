import Block from "../../Block.js";
import { dialogNavTmpl } from "./DialogNavTmpl.js";
export class DialogNavBlock extends Block {
    constructor(props) {
        super("nav", Object.assign(Object.assign({}, props), { classList: ["navbar"] }));
    }
    componentDidMount() {
        this.element.appendChild(this.props.userBlock.element);
    }
    render() {
        return this.element.innerHTML + dialogNavTmpl;
    }
}
//# sourceMappingURL=DialogNavBlock.js.map