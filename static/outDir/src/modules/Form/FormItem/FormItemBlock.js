import Block from "../../Block.js";
import { Validation } from "../../Validation.js";
import { formItemTmpl } from "./FormItemTmpl.js";
export class FormItemBlock extends Block {
    constructor(props) {
        super('div', Object.assign(Object.assign({}, props), { classList: ["formItem"] }));
        this._checkErrors = () => {
            this.errors = this.validator.getValidityState();
        };
        this.appendErrors = () => {
            var _a, _b;
            if (((_a = this.element.lastElementChild) === null || _a === void 0 ? void 0 : _a.tagName) === 'span'.toUpperCase()) {
                this.removeErrors();
            }
            this._checkErrors();
            const errorContainer = document.createElement('span');
            errorContainer.classList.add('invalidFeedback');
            errorContainer.innerHTML = this.errors.join('<br/>');
            (_b = this.element) === null || _b === void 0 ? void 0 : _b.append(errorContainer);
        };
        this.removeErrors = () => {
            var _a;
            this.errors = [];
            if (((_a = this.element.lastElementChild) === null || _a === void 0 ? void 0 : _a.tagName) === 'span'.toUpperCase()) {
                this.element.removeChild(this.element.lastElementChild);
            }
        };
        this.errors = [];
        const input = this.element.getElementsByTagName('input');
        if (input) {
            this.validator = new Validation(input[0], props.validateMessages, props.validators);
            input[0].addEventListener('blur', this.appendErrors.bind(this));
            input[0].addEventListener('focus', this.removeErrors.bind(this));
        }
    }
    render() {
        const tmpl = Handlebars.compile(formItemTmpl);
        return tmpl(this.props);
    }
}
//# sourceMappingURL=FormItemBlock.js.map