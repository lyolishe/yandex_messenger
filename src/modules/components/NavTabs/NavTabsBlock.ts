import Block from "../Block";
import {navTabsTmpl} from "./NavTabsTmpl";
import * as Handlebars from 'handlebars'

export class NavTabsBlock extends Block<{}> {
    constructor() {
        super('nav', {classList: ["navTabs"]});
    }

    render(): string {
        return Handlebars.compile(navTabsTmpl)(this.props)
    }
}

