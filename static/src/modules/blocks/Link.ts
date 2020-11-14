import Block from "../components/Block.js";

export class Link extends Block {
    constructor(to: string, text?: string) {
        super('a', {classList: ['link']}, text?? '');
        (this.element as HTMLLinkElement).href = to
    }
}