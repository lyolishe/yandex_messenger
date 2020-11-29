import Block, {DefaultBlockProps} from "../Block";
import {dialogNavTmpl} from "./DialogNavTmpl";
import {UserBlock} from "../UserBlock/UserBlock";

export type DialogNavBlockProps = {
    userBlock: UserBlock;
}

export class DialogNavBlock extends Block<DialogNavBlockProps>{
    constructor(props: DefaultBlockProps<DialogNavBlockProps>) {
        super("nav", {...props, classList: ["navbar"]});
        this.element.appendChild(this.props.userBlock.element);
    }

    render(): string {
        return  this.element.innerHTML + dialogNavTmpl
    }
}