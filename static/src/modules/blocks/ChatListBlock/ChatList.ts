import Block, {DefaultBlockProps} from "../../components/Block.js";
import {ChatItemBlock} from "../ChatItemBlock/ChatItemBlock";
type ChatListBlockProps = {
    onDialogPick: (chatId: string) => void
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
            currentTarget.setProps({isActive: true, unreadCount: 0});
            this.props.onDialogPick(currentTarget.props.responder?.firstName!)
        }).bind(this)
    }
}