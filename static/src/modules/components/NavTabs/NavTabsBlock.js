import Block from "../../Block.js";
import { navTabsTmpl } from "./NavTabsTmpl.js";
export class NavTabsBlock extends Block {
    constructor() {
        super('nav', { classList: ["navTabs"] });
    }
    render() {
        const tmpl = navTabsTmpl;
        return Handlebars.compile(tmpl)(this.props);
    }
}
//# sourceMappingURL=NavTabsBlock.js.map