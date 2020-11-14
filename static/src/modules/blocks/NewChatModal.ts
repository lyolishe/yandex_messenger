import {Modal, ModalHeader} from "../components/Modal/Modal.js";
import {Form} from "../components/Form/Form.js";
import {Button} from "../components/Button/Button.js";
import {useApi} from "../Utilits.js";
import {ChatsApi} from "../../api/ChatsApi.js";
import {CreateChatRequest} from "../../data/Contracts.js";

export class NewChatModal extends Modal {
    form: Form;
    setChats: ()=> void;
    constructor(form: Form, setChats: ()=> void) {
        super(new ModalHeader('New Message'), form);
        this.form = form
        this.setChats = setChats
        const button = new Button({form: "newMessage",
            type: "submit", classList: ["btn", "btnPrimary", "w100"],
            text: "CreateChat!",
            onClick: this.onCreateChat.bind(this)
        })
        this.content.setProps({children: [...this.content.props.children!, button]})
    }

    onCreateChat() {
        useApi<CreateChatRequest>(ChatsApi.addChat(this.form.getFieldValue<CreateChatRequest>()))
            .then(() => this.setChats())
    }
}