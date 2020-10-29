import Block from "../../Block.js";
import {navTabsTmpl} from "./NavTabsTmpl.js";

export type NavTabsBlockProps = {
    classList?: string[];
}

export class NavTabsBlock extends Block<NavTabsBlockProps> {
    constructor() {
        super('nav', {classList: ["navTabs"]});
    }

    render(): string {
        const tmpl = navTabsTmpl;
        return Handlebars.compile(tmpl)(this.props)
    }
}

