import Block from "../../Block.js";
import {ChatItemBlock} from "../ChatItemBlock/ChatItemBlock.js";

export type ChatListProps = {
    classList: string[]
}

export class ChatListBlock extends Block<ChatListProps> {
    onClick: (e: Event) => void
    constructor(props?: ChatListProps) {
        super('ul', {...props, classList: ["chatList"]});
        this.onClick = function onClick(e: Event){
            this.children.forEach((elem:ChatItemBlock)=> {
                elem.element?.classList.remove('active');
            });
            (e.currentTarget as HTMLElement).classList.add('active');
        }.bind(this)
    }
}