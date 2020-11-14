import Block, {DefaultBlockProps} from "../../components/Block.js";
import {ChatItemBlock} from "../ChatItemBlock/ChatItemBlock.js";

type ChatListBlockProps = {
    onDialogPick: (chatId: number) => void
}

export class ChatListBlock extends Block<ChatListBlockProps> {
    onClick: (e: Event) => void
    constructor(props: DefaultBlockProps<ChatListBlockProps>) {
        super('ul', {...props, classList: ["chatList"], onDialogPick: props.onDialogPick, });
        this.onClick = ((e: Event) => {
            (this.props.children as ChatItemBlock[]).filter(child => child.props.isActive)
            .forEach(active => {
                active.setProps({...active.props, isActive: false})
            })
            const currentTarget = (this.props.children as ChatItemBlock[]).find((child) => child.element == e.currentTarget)!;
            currentTarget.setProps({...currentTarget.props, isActive: true, unread_count: '0'});
            this.props.onDialogPick(currentTarget.id)
        }).bind(this)
    }
}