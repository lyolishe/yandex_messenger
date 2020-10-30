import Block from "../../Block.js";
import { blankDialogBlockTmpl } from "./BlankDialogBlockTmpl.js";
export const blankDialogPageInitProps = {
    handlers: {
        onNewDialog: () => {
            alert("New message modal in progress!");
        }
    },
    text: "New dialog...",
    iconUrl: "",
    buttonClasses: "btn btnLink textWhite",
    classList: ["row", "myAuto"]
};
export class BlankDialogBlock extends Block {
    constructor(props) {
        super('div', props);
    }
    render() {
        return Handlebars.compile(blankDialogBlockTmpl)(this.props);
    }
}
//# sourceMappingURL=BlankDialogBlock.js.map