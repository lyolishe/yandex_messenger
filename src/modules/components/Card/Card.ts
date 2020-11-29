import Block from "../Block";

export type CardProps = {
    body: Block;
    header?: Block;
    footer?: Block;
}

export class Card extends Block {
    constructor(props: CardProps) {
        super('div', {classList: ["card", "logInCard"], children: [props.header!, props.body, props.footer!]});
    }
}

export class CardHeader extends Block {
    constructor(title: string, extra?: Block[]) {
        super('div', {classList: ["logInHeader"]}, title);
        if (extra) {
            this.setProps({children: extra})
        }
    }
}

export class CardFooter extends Block {
    constructor(extra?: Block[]) {
        super('div', {classList: ["loginFooter"], children: extra});
    }
}