import Block, {DefaultBlockProps} from "../Block.js";
import {messageInputTmpl} from "./MessageInputTmpl.js";

export class MessageInputBlock extends Block<{}> {
    constructor(props?: DefaultBlockProps<{}>) {
        super("div", {...props, classList: ["messageInputRow"]});
    }
    
    render(): string {
        return messageInputTmpl;
    }
}