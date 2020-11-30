import { MessageBlock } from '../MessageBlock/MessageBlock';
import Block, { DefaultBlockProps } from '../Block';
import { Message } from '../../../types/Contracts';

export type DialogBlockProps = {
    messages: Message[];
}

export class DialogBlock extends Block<DialogBlockProps> {
    constructor(props: DefaultBlockProps<DialogBlockProps>) {
        super('div', { ...props, classList: ['dialog'] });

        const messageList = new Block('ul', {
            classList: ['messageList'],
            children: this.props.messages.map(this._createMessage),
        });
        this.setProps({ ...this.props, children: [messageList] });
    }

    private _createMessage = (message: Message): MessageBlock => new MessageBlock({
        message,
        classList: message.isResponder ? ['chatItemResponse'] : ['chatItem'],
    })
}
