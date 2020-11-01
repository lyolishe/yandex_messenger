import {ChatItem} from "../../../data/Contracts.js";
import Block, {DefaultBlockProps} from "../../Block.js";
import {chatItemTmpl} from "./ChatItemTmpl.js";

export type ChatItemProps = ChatItem & {
    onClick?: (e: Event) => void;
};

export class ChatItemBlock extends Block<ChatItemProps> {
    constructor(props: DefaultBlockProps<ChatItemProps>) {
        super("li", props)
        if (this.props.isActive) {
            this.element?.classList.add('active');
        }
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