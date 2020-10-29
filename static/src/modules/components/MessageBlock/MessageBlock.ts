import Block from "../../Block.js";
import {messageBlockTmpl} from "./MessageBlockTmpl.js";
import {Message} from "../../../data/Contracts.js";

export type MessageProps = {
    message: Message;
    classList: string[];
}

export class MessageBlock extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super("li", props);
    }

    render(): string {
        const tmpl = messageBlockTmpl;
        return Handlebars.compile(tmpl)(this.props.message);
    }
}