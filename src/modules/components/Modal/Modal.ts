import Block from '../Block';
import modalTmpl from './ModalTmpl';
import ModalHeader from './ModalHeader';

export default class Modal extends Block {
    content: Block;

    footer?: Block;

    constructor(header: ModalHeader, content: Block, footer?: Block) {
        super('div', { classList: ['modal'] }, modalTmpl);
        this.content = Modal._createContent(content);
        this.footer = Modal._createFooter(footer);
        this.setProps({ children: [header, this.content, this.footer] });
        this.element.addEventListener('click', this.close.bind(this));
        this.hide();
        document.body.appendChild(this.element);
    }

    private static _createContent(content: Block): Block {
        return new Block('div', { children: [content], classList: ['modalBody'] });
    }

    private static _createFooter(footer?: Block): Block {
        return footer ? new Block('div', { classList: ['modalFooter'], children: [footer] })
            : new Block('div', { classList: ['modalFooter'] });
    }

    show():void {
        this.getContent().style.display = 'flex';
    }

    close(e: MouseEvent): void {
        if (e.target === this.element) {
            this.hide();
        }
    }
}
