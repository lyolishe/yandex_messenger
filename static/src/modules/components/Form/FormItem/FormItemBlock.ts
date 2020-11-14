import Block, {DefaultBlockProps} from "../../Block.js";
import {Validation, Validator} from "../../../Validation.js";
import {formItemTmpl} from "./FormItemTmpl.js";
import * as Handlebars from 'handlebars'


export type FormItemBlockProps = {
    label?: string;
    initialValue?: string|number;
    name?: string;
    type?: string;
    maxLength?: number;
    minLength?: number;
    pattern?: RegExp;
    validateMessages?: Record<keyof ValidityState, string>
    validators?: Validator[];
    placeholder?: string;
    required?: boolean;
}

export class FormItemBlock extends Block<FormItemBlockProps>{
    errors: string[]
    input: HTMLInputElement;
    validator: Validation;

    constructor(props: DefaultBlockProps<FormItemBlockProps>) {
        super('div', {...props, classList: ["formItem"]});

        this.errors = [];
        this.input = this.element.getElementsByTagName('input')[0]

        if (this.input) {
            this.validator = new Validation(this.input!, props.validateMessages, props.validators);
            this.input.addEventListener('blur', this.appendErrors.bind(this))
            this.input.addEventListener('focus', this.removeErrors.bind(this))
        }
    }

    get value () {
        return this.input.value
    }

    get name() {
        return this.input.name
    }

    private _checkErrors = ():void => {
        this.errors = this.validator.getValidityState();
    }

    appendErrors = ():void => {
        if(this.element.lastElementChild?.tagName === 'span'.toUpperCase()) {
            this.removeErrors();
        }

        this._checkErrors()
        const errorContainer = document.createElement('span');
        errorContainer.classList.add('invalidFeedback')
        errorContainer.innerHTML = this.errors.join('<br/>')

        this.element?.append(errorContainer)
    }

    removeErrors = (): void => {
        this.errors = []
        if (this.element.lastElementChild?.tagName === 'span'.toUpperCase()) {
            this.element.removeChild(this.element.lastElementChild);
        }
    }

    render(): string {
        const tmpl = Handlebars.compile(formItemTmpl)
        return tmpl(this.props)
    }
}