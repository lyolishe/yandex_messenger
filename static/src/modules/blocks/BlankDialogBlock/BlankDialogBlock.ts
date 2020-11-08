import Block, {DefaultBlockProps} from "../../components/Block.js";
import {blankDialogBlockTmpl} from "./BlankDialogBlockTmpl.js";

export type BlankDialogBlockProps = {
    handlers?: {
        onNewDialog?: ()=> void;
    }
    text?: string;
    iconUrl?: string;
    buttonClasses?: string;
}

export const blankDialogPageInitProps: DefaultBlockProps<BlankDialogBlockProps> = {
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
    constructor(props: DefaultBlockProps<BlankDialogBlockProps>) {
        super('div', props);
    }

    render(): string {
        return Handlebars.compile(blankDialogBlockTmpl)(this.props)
    }

}