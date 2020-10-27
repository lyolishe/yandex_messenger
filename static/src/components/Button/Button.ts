import Block from "../../modules/Block.js";
import {ButtonTmpl} from "./Button.tmpl.js";

export type ButtonProps = {
    onClick?: ()=>void;
    text: string;
    buttonType?: "Primary"|"Link"|"CircleOutline"
}

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super("button", props);
    }

    componentDidMount() {
        this.element?.classList.add(`btn`, `btn${this.props.buttonType}`)
        if (this.props.onClick && this.element) {
            this.element.onclick = this.props.onClick.bind(this)
        }
    }

    render(): string {
        const tmpl = ButtonTmpl;
        return Handlebars.compile(tmpl)(this.props)
    }
}