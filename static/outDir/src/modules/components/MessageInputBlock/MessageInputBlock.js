import Block from "../../Block.js";
import { messageInputTmpl } from "./MessageInputTmpl.js";
export class MessageInputBlock extends Block {
    constructor(props) {
        super("div", Object.assign(Object.assign({}, props), { classList: ["messageInputRow"] }));
    }
    render() {
        return messageInputTmpl;
    }
}
//# sourceMappingURL=MessageInputBlock.js.map