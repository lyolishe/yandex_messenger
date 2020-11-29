import {ChatsResponse, UnreadCountResponse} from "../../../types/Contracts";
import Block, {DefaultBlockProps} from "../Block";
import {chatItemTmpl} from "./ChatItemTmpl";
import {useApi} from "../../Utilits";
import {ChatsApi} from "../../../api/ChatsApi";
import * as Handlebars from 'handlebars'


export type ChatItemProps = ChatsResponse & UnreadCountResponse & {
    onClick: (e: Event) => void;
    setChats: () => void
    isActive?: boolean;
};

export class ChatItemBlock extends Block<ChatItemProps> {
    id: number
    setChats: ()=> void
    constructor(props: DefaultBlockProps<ChatItemProps>) {
        super("li", props)

        this.id = props.id?? 0;
        this.setChats = props.setChats
        useApi<UnreadCountResponse>(ChatsApi.getNewMessages(this.id))
            .then(unread_count => this.setProps({...this.props, ...unread_count}))

        this.element.addEventListener('click', (e)=> {
            this._removeChat.bind(this)(e)
            this.props.onClick(e)
        })
    }

    private _removeChat(e: MouseEvent): void {
        if ((e.target as HTMLElement).classList.contains("remove")) {
            ChatsApi.removeChat({chatId: this.id}).then(()=> this.setChats())
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