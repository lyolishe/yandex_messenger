import * as Handlebars from 'handlebars';
import Block from '../Block';
import navTabsTmpl from './NavTabsTmpl';

export default class NavTabsBlock extends Block {
    constructor() {
        super('nav', { classList: ['navTabs'] });
    }

    render(): string {
        return Handlebars.compile(navTabsTmpl)(this.props);
    }
}
