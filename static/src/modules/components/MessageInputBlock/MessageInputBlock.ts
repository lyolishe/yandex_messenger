import Block from "../../Block.js";
import {messageInputTmpl} from "./MessageInputTmpl.js";

export type MessageInputBlockProps = {
    classList?: string[];
}

export class MessageInputBlock extends Block<MessageInputBlockProps> {
    constructor(props?: MessageInputBlockProps) {
        super("div", {...props, classList: ["messageInputRow"]});
    }
    
    render(): string {
        return messageInputTmpl;
    }
}