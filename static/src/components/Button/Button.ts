import Block from "../../modules/Block.js";
import {buttonTmpl} from "./ButtonTmpl.js";

export type ButtonProps = {
    onClick?: ()=>void;
    text: string;
    buttonType?: "Primary"|"Link"|"CircleOutline"
    classList?: string[]
}

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super("button", props);
    }

    componentDidMount() {
        if (this.props.onClick && this.element) {
            this.element.onclick = this.props.onClick.bind(this)
        }
    }

    render(): string {
        const tmpl = buttonTmpl;
        return Handlebars.compile(tmpl)(this.props)
    }
}