import Block from "../../Block.js";
import { messageBlockTmpl } from "./MessageBlockTmpl.js";
export class MessageBlock extends Block {
    constructor(props) {
        super("li", props);
    }
    render() {
        return Handlebars.compile(messageBlockTmpl)(this.props.message);
    }
}
//# sourceMappingURL=MessageBlock.js.map