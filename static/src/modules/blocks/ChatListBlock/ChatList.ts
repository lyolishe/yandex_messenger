import Block, {DefaultBlockProps} from "../../components/Block.js";
import {ChatItemBlock} from "../ChatItemBlock/ChatItemBlock.js";
type ChatListBlockProps = {
    onDialogPick: (chatId: number) => void
}
export class ChatListBlock extends Block<ChatListBlockProps> {
    onClick: (e: Event) => void
    constructor(props?: DefaultBlockProps<ChatListBlockProps>) {
        super('ul', {classList: ["chatList"],onDialogPick: props?.onDialogPick!, ...props});
        this.onClick = ((e: Event) => {
            (this.props.children as ChatItemBlock[]).filter(child => child.props.isActive)
            .forEach(child => {
                child.setProps({...child.props, isActive: false})
            })
            const currentTarget: ChatItemBlock = (this.props.children as ChatItemBlock[]).find((child) => child.element == e.currentTarget)!;
            currentTarget.setProps({isActive: true, unread_count: '0'});
            this.props.onDialogPick(currentTarget.id)
        }).bind(this)
    }
}