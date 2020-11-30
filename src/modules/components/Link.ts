import Block from './Block';

export default class Link extends Block {
    constructor(to: string, text?: string) {
        super('a', { classList: ['link'] }, text ?? '');
        (this.element as HTMLLinkElement).href = to;
    }
}
