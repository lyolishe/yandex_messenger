import Block from '../Block';

export type CardProps = {
    body: Block;
    header?: Block;
    footer?: Block;
}

export class Card extends Block {
    constructor(props: CardProps) {
        super('div', { classList: ['card', 'logInCard'], children: [props.header!, props.body, props.footer!] });
    }
}
