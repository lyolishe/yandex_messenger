import {UserBlockProps} from "../UserBlock/UserBlock.js";
import Block from "../../Block.js";
import {dialogNavTmpl} from "./DialogNavTmpl.js";

export type DialogNavBlockProps = {
    userBlock: Block<UserBlockProps>;
    classList?: string[];
}

export class DialogNavBlock extends Block<DialogNavBlockProps>{
    constructor(props: DialogNavBlockProps) {
        super("nav", {...props, classList: ["navbar"]});
    }

    componentDidMount() {
        this.element?.appendChild(this.props.userBlock.element!);
    }

    render(): string {
        return  this.element?.innerHTML + dialogNavTmpl
    }
}