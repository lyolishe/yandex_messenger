import Block from "../../Block.js";
import { navTabsTmpl } from "./NavTabsTmpl.js";
export class NavTabsBlock extends Block {
    constructor() {
        super('nav', { classList: ["navTabs"] });
    }
    render() {
        return Handlebars.compile(navTabsTmpl)(this.props);
    }
}
//# sourceMappingURL=NavTabsBlock.js.map