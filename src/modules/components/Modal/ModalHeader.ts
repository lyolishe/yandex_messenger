import Block from '../Block';

export default class ModalHeader extends Block {
    constructor(title: string, extras?: Block[]) {
        super('div', { classList: ['modalHeader'], children: [new Block('h3', {}, title)] });
        if (extras) {
            this.setProps({ children: [...this.props.children!, ...extras] });
        }
    }
}
