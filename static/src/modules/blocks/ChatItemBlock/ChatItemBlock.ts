import {ChatsResponse, UnreadCountResponse} from "../../../data/Contracts.js";
import Block, {DefaultBlockProps} from "../../components/Block.js";
import {chatItemTmpl} from "./ChatItemTmpl.js";
import {useApi} from "../../Utilits.js";
import {ChatsApi} from "../../../api/ChatsApi.js";

export type ChatItemProps = ChatsResponse & UnreadCountResponse & {
    onClick?: (e: Event) => void;
    isActive?: boolean;
};

export class ChatItemBlock extends Block<ChatItemProps> {
    id: number
    constructor(props: DefaultBlockProps<ChatItemProps>) {
        super("li", props)

        this.id = props.id?? 0;
        useApi<UnreadCountResponse>(ChatsApi.getNewMessages(this.id))
            .then(unread_count => this.setProps({...this.props, ...unread_count}))

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