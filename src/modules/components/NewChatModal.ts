import ChatsApi from '../../api/ChatsApi';
import ModalHeader from './Modal/ModalHeader';
import Modal from './Modal/Modal';
import { Form } from './Form/Form';
import { Button } from './Button/Button';
import { useApi } from '../Utilits';
import { CreateChatRequest } from '../../types/Contracts';

export default class NewChatModal extends Modal {
    form: Form;

    setChats: ()=> void;

    constructor(form: Form, setChats: ()=> void) {
        super(new ModalHeader('New Message'), form);
        this.form = form;
        this.setChats = setChats;
        const button = new Button({
            form: 'newMessage',
            type: 'submit',
            classList: ['btn', 'btnPrimary', 'w100'],
            text: 'CreateChat!',
            onClick: this.onCreateChat.bind(this),
        });
        this.content.setProps({ children: [...this.content.props.children!, button] });
    }

    onCreateChat(): void {
        useApi<CreateChatRequest>(ChatsApi.addChat(this.form.getFieldValue<CreateChatRequest>()))
            .then(() => this.setChats());
    }
}
