import Block, {DefaultBlockProps} from "../../components/Block.js";
import {ChatItemBlock} from "../ChatItemBlock/ChatItemBlock";

export class ChatListBlock extends Block {
    onClick: (e: Event) => void
    constructor(props?: DefaultBlockProps) {
        super('ul', {...props, classList: ["chatList"]}, `<children></children>`);
        this.onClick = ((e: Event) => {
            this.props.children?.forEach((child: ChatItemBlock) => {
                child.setProps({isActive: false})
            })
            const currentTarget: ChatItemBlock = (this.props.children as ChatItemBlock[]).find((child) => child.element == e.currentTarget)!;
            currentTarget.setProps({isActive: true, unreadCount: 0});
        }).bind(this)
    }
}