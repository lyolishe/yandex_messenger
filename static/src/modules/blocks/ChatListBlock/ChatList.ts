import Block, {DefaultBlockProps} from "../../components/Block.js";
import {ChatItemBlock} from "../ChatItemBlock/ChatItemBlock";
type ChatListBlockProps = {
    onDialogPick: (chatId: string) => void
}
export class ChatListBlock extends Block<ChatListBlockProps> {
    onClick: (e: Event) => void
    constructor(props?: DefaultBlockProps<ChatListBlockProps>) {
        super('ul', {classList: ["chatList"],onDialogPick: props?.onDialogPick!, ...props}, `<children></children>`);
        this.onClick = ((e: Event) => {
            this.props.children?.forEach((child: ChatItemBlock) => {
                child.setProps({isActive: false})
            })
            const currentTarget: ChatItemBlock = (this.props.children as ChatItemBlock[]).find((child) => child.element == e.currentTarget)!;
            this.props.onDialogPick(currentTarget.props.responder?.firstName!)
            currentTarget.setProps({isActive: true, unreadCount: 0});
        }).bind(this)
    }
}