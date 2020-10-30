import Block from "../../Block.js";
import {blankDialogBlockTmpl} from "./BlankDialogBlockTmpl.js";

export type BlankDialogBlockProps = {
    handlers?: {
        onNewDialog?: ()=> void;
    }
    text?: string;
    iconUrl?: string;
    buttonClasses?: string;
    classList?: string[]
}

export const blankDialogPageInitProps: BlankDialogBlockProps = {
    handlers: {
        onNewDialog: () => {
            alert("New message modal in progress!")
        }
    },
    text: "New dialog...",
    iconUrl: "",
    buttonClasses: "btn btnLink textWhite",
    classList: ["row", "myAuto"]
}

export class BlankDialogBlock extends Block<BlankDialogBlockProps>{
    constructor(props: BlankDialogBlockProps) {
        super('div', props);
    }

    render(): string {
        return Handlebars.compile(blankDialogBlockTmpl)(this.props)
    }

}