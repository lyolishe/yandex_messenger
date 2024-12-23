import * as Handlebars from 'handlebars';
import Block, { DefaultBlockProps } from '../Block';
import messageBlockTmpl from './MessageBlockTmpl';
import { Message } from '../../../types/Contracts';

export type MessageProps = {
    message: Message;
}

export class MessageBlock extends Block<MessageProps> {
    constructor(props: DefaultBlockProps<MessageProps>) {
        super('li', props);
    }

    render(): string {
        return Handlebars.compile(messageBlockTmpl)(this.props.message);
    }
}
