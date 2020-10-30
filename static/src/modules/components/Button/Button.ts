import Block, {DefaultBlockProps} from "../../Block.js";
import {buttonTmpl} from "./ButtonTmpl.js";

export type ButtonProps = {
    onClick?: ()=>void;
    text: string;
}

export class Button extends Block<ButtonProps> {
    constructor(props: DefaultBlockProps<ButtonProps>) {
        super("button", props);
    }

    componentDidMount() {
        if (this.props.onClick && this.element) {
            this.element.onclick = this.props.onClick
        }
    }

    render(): string {
        return Handlebars.compile(buttonTmpl)(this.props)
    }
}