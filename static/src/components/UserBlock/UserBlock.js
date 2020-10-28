import Block from "../../modules/Block.js";
import { userBlockTmpl } from "./UserBlockTmpl.js";
export class UserBlock extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        const tmpl = userBlockTmpl;
        return Handlebars.compile(tmpl)(this.props);
    }
}
//# sourceMappingURL=UserBlock.js.map