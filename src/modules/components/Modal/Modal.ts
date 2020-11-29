import Block from "../Block";
import {modalTmpl} from "./ModalTmpl";

export class Modal extends Block{
    content: Block;
    footer?: Block;
    constructor(header: ModalHeader, content: Block, footer?: Block) {
        super('div', {classList: ["modal"]}, modalTmpl);
        this.content = this._createContent(content)
        this.footer = this._createFooter(footer)
        this.setProps({children: [header, this.content, this.footer]})
        this.element.addEventListener('click', this.close.bind(this))
        this.hide();
        document.body.appendChild(this.element)
    }

    private _createContent(content: Block) {
        return new Block('div', {children: [content], classList: ["modalBody"]})
    }

    private _createFooter(footer?: Block) {
        return footer? new Block('div',{classList: ["modalFooter"], children: [footer]})
            :  new Block('div',{classList: ["modalFooter"]})
    }

    show() {
        this.getContent().style.display = "flex"
    }

    close(e: MouseEvent) {
        if (e.target === this.element) {
            this.hide()
        }
    }
}

export class ModalHeader extends Block {
    constructor(title: string,  extras?: Block[]) {
        super('div',{classList: ['modalHeader'], children: [new Block('h3', {}, title)]});
        extras && this.setProps({children: [...this.props.children!, ...extras]})
    }
}