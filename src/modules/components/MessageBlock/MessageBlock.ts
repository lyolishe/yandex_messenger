import Block, {DefaultBlockProps} from "../Block.js";
import {messageBlockTmpl} from "./MessageBlockTmpl.js";
import {Message} from "../../../types/Contracts.js";

export type MessageProps = {
    message: Message;
}

export class MessageBlock extends Block<MessageProps> {
    constructor(props: DefaultBlockProps<MessageProps>) {
        super("li", props);
    }

    render(): string {
        return Handlebars.compile(messageBlockTmpl)(this.props.message);
    }
}