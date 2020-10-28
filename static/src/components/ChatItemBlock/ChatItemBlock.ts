import {ChatItem} from "../../data/Contracts.js";
import Block from "../../modules/Block.js";
import {chatItemTmpl} from "./ChatItemTmpl.js";

export type ChatItemProps = ChatItem & {
    onClick?: (e: Event) => void;
    classList?: string[];
};

export class ChatItemBlock extends Block<ChatItemProps> {
    constructor(props: ChatItemProps) {
        super("li", props)
    }

    componentDidMount() {
        if (this.props.onClick && this.element) {
            this.element.onclick = this.props.onClick
        }
    }

    render(): string {
        const tmpl = chatItemTmpl;
        return Handlebars.compile(tmpl)(this.props);
    }
}