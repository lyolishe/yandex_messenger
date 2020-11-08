import {ChatItem} from "../../../data/Contracts.js";
import Block, {DefaultBlockProps} from "../../components/Block.js";
import {chatItemTmpl} from "./ChatItemTmpl.js";

export type ChatItemProps = ChatItem & {
    onClick?: (e: Event) => void;
};

export class ChatItemBlock extends Block<ChatItemProps> {
    constructor(props: DefaultBlockProps<ChatItemProps>) {
        super("li", props)

        if (this.props.onClick) {
            this.element.onclick = this.props.onClick
        }
    }

    render(): string {
        if (this.props.isActive) {
            this.element.classList.add('active');
        } else {
            this.element.classList.remove('active');
        }

        return Handlebars.compile(chatItemTmpl)(this.props);
    }

}