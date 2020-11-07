import Block from "../../Block.js";
import { userBlockTmpl } from "./UserBlockTmpl.js";
export class UserBlock extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        return Handlebars.compile(userBlockTmpl)(this.props);
    }
}
//# sourceMappingURL=UserBlock.js.map