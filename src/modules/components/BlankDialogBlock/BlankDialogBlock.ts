import Block from "../Block";
import {blankDialogBlockTmpl} from "./BlankDialogBlockTmpl";
import {NewChatModal} from "../NewChatModal";
import {Button} from "../Button/Button";
import {Form} from "../Form/Form";
import {newMessageFormModalTmpl} from "../Form/FormTamplates/NewMessageFormTmpl";

export type BlankDialogBlockProps = {
    iconUrl?: string;
}

export class BlankDialogBlock extends Block<BlankDialogBlockProps>{
    setChats: () => void
    constructor(setChats: () => void) {
        super('div', {iconUrl: "",classList: ["row", "myAuto"]}, blankDialogBlockTmpl);
        this.setChats = setChats;
        const modal = new NewChatModal(new Form({id: "newMessage"}, newMessageFormModalTmpl), this.setChats);
        const button = new Button({classList:["btn", "btnLink", "textWhite"], type: "button", text: "New dialog...", onClick: modal.show.bind(modal)})
        this.setProps({children: [button]})
    }
}