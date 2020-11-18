import Block from "../Block.js";
import {blankDialogBlockTmpl} from "./BlankDialogBlockTmpl.js";
import {NewChatModal} from "../NewChatModal.js";
import {Button} from "../Button/Button.js";
import {Form} from "../Form/Form.js";
import {newMessageFormModalTmpl} from "../Form/FormTamplates/NewMessageFormTmpl.js";

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