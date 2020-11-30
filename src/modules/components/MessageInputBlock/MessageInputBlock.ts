import Block, { DefaultBlockProps } from '../Block';
import messageInputTmpl from './MessageInputTmpl';

export default class MessageInputBlock extends Block {
    constructor(props?: DefaultBlockProps) {
        super('div', { ...props, classList: ['messageInputRow'] }, messageInputTmpl);
    }
}
