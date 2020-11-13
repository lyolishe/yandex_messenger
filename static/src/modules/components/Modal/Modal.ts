import Block from "../Block.js";
import {modalTmpl} from "./ModalTmpl.js";
import {Button} from "../Button/Button";

export type ModalProps = {
    header: ModalHeader;
    content: Block[];
    footer?: Block[];
}

export class Modal extends Block<ModalProps>{
    constructor(header: ModalHeader, content: Block[], footer?: Block[]) {
        super('div', {classList: ["modal"], header, content, footer}, modalTmpl);
        document.addEventListener('click', this.onclick.bind(this))
        this.hide();

        document.appendChild(this.element)
    }

    onclick: (e: Event) => {

    }

}

export class ModalHeader extends Block {
    constructor(title: string, close: () => void, extras?: Block[]) {
        super('div',{classList: ['modalHeader'], children: [new Block('h3', {}, title)]});
        if (extras) {
            this.setProps({children: [...this.props.children!, ...extras]})
        } else {
            this.setProps({children: [...this.props.children!,
                new Button({onClick: close, text: '&times;', type: 'button', classList:['button']})
            ]})
        }
    }
}