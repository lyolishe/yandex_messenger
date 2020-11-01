import Block, {DefaultBlockProps} from "../../Block.js";
import {dialogNavTmpl} from "./DialogNavTmpl.js";
import {UserBlock} from "../UserBlock/UserBlock";

export type DialogNavBlockProps = {
    userBlock: UserBlock;
}

export class DialogNavBlock extends Block<DialogNavBlockProps>{
    constructor(props: DefaultBlockProps<DialogNavBlockProps>) {
        super("nav", {...props, classList: ["navbar"]});
    }

    componentDidMount() {
        this.element?.appendChild(this.props.userBlock.element!);
    }

    render(): string {
        return  this.element?.innerHTML + dialogNavTmpl
    }
}