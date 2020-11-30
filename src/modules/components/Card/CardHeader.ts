import Block from '../Block';

export default class CardHeader extends Block {
    constructor(title: string, extra?: Block[]) {
        super('div', { classList: ['logInHeader'] }, title);
        if (extra) {
            this.setProps({ children: extra });
        }
    }
}
