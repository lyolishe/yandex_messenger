import Block, {DefaultBlockProps} from "../../../Block.js";
import {Validation, Validator} from "../../../Validation.js";
import {formItemTmpl} from "./FormItemTmpl.js";

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

        const input = this.element?.getElementsByTagName('input')
        if (input) {
            this.validator = new Validation(input[0]!, props.validateMessages, props.validators);
            input[0].addEventListener('blur', this.appendErrors.bind(this))
            input[0].addEventListener('focus', this.removeErrors.bind(this))
        }

    }

    private _checkErrors = ():void => {
        this.errors = this.validator.getValidityState();
    }

    appendErrors = ():void => {
        if(this.element?.lastElementChild?.tagName === 'span'.toUpperCase()) {
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
        if (this.element?.lastElementChild?.tagName === 'span'.toUpperCase()) {
            this.element.removeChild(this.element.lastElementChild);
        }
    }

    render(): string {
        const tmpl = Handlebars.compile(formItemTmpl)
        return tmpl(this.props)
    }
}