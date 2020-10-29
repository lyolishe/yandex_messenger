import Block from "../../Block.js";
import { dialogNavTmpl } from "./DialogNavTmpl.js";
export class DialogNavBlock extends Block {
    constructor(props) {
        super("nav", Object.assign(Object.assign({}, props), { classList: ["navbar"] }));
    }
    componentDidMount() {
        var _a;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.appendChild(this.props.userBlock.element);
    }
    render() {
        var _a;
        return ((_a = this.element) === null || _a === void 0 ? void 0 : _a.innerHTML) + dialogNavTmpl;
    }
}
//# sourceMappingURL=DialogNavBlock.js.map