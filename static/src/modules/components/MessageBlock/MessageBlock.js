import Block from "../../Block.js";
import { messageBlockTmpl } from "./MessageBlockTmpl.js";
export class MessageBlock extends Block {
    constructor(props) {
        super("li", props);
    }
    render() {
        const tmpl = messageBlockTmpl;
        return Handlebars.compile(tmpl)(this.props.message);
    }
}
//# sourceMappingURL=MessageBlock.js.map