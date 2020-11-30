import Block, { DefaultBlockProps } from '../Block';
import { ChatItemBlock } from '../ChatItemBlock/ChatItemBlock';

type ChatListBlockProps = {
    onDialogPick: (chatId: number) => void
}

export default class ChatListBlock extends Block<ChatListBlockProps> {
    constructor(props: DefaultBlockProps<ChatListBlockProps>) {
        super('ul', { ...props, classList: ['chatList'], onDialogPick: props.onDialogPick });
    }

    onClick = (e:Event): void => {
        (this.props.children as ChatItemBlock[]).filter((child) => child.props.isActive)
            .forEach((active) => {
                active.setProps({ ...active.props, isActive: false });
            });
        const currentTarget = (this.props.children as ChatItemBlock[]).find(
            (child) => child.element === e.currentTarget,
        )!;
        currentTarget.setProps({ ...currentTarget.props, isActive: true, unread_count: '0' });
        this.props.onDialogPick(currentTarget.id);
    }
}
