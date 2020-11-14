import Block, {DefaultBlockProps} from "../Block.js";
import {buttonTmpl} from "./ButtonTmpl.js";
import * as Handlebars from 'handlebars'

export type ButtonProps = {
    onClick?: ()=>void;
    text: string;
    type: string;
    form?: string;
}

export class Button extends Block<ButtonProps> {
    constructor(props: DefaultBlockProps<ButtonProps>) {
        super("button", props);
        this.element.setAttribute('form', props.form!);
        this.element.setAttribute('type', props.type)

        if (this.props.onClick) {
            this.element.onclick = this.props.onClick
        }
    }

    render(): string {
        return Handlebars.compile(buttonTmpl)(this.props)
    }
}