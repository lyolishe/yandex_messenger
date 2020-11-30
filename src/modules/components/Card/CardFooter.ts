import Block from '../Block';

export default class CardFooter extends Block {
    constructor(extra?: Block[]) {
        super('div', { classList: ['loginFooter'], children: extra });
    }
}
