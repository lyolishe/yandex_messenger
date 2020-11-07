import Block, {DefaultBlockProps} from "../../Block.js";
import {ChatItemBlock} from "../ChatItemBlock/ChatItemBlock.js";

export class ChatListBlock extends Block<{}> {
    onClick: (e: Event) => void
    constructor(props?: DefaultBlockProps<{}>) {
        super('ul', {...props, classList: ["chatList"]});
        this.onClick = function onClick(e: Event){
            this.children.forEach((elem:ChatItemBlock)=> {
                elem.element.classList.remove('active');
            });
            (e.currentTarget as HTMLElement).classList.add('active');
        }.bind(this)
    }
}