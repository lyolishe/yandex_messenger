import Block from "../Block.js";
import { Validation } from "../Validation.js";
import { formItemTmpl } from "./FormItemTmpl.js";
export class FormItemBlock extends Block {
    constructor(props) {
        var _a;
        super('div', Object.assign(Object.assign({}, props), { classList: ["formItem"] }));
        this._checkErrors = () => {
            this.errors = this.validator.getValidityState();
        };
        this.appendErrors = () => {
            var _a, _b, _c;
            if (((_b = (_a = this.element) === null || _a === void 0 ? void 0 : _a.lastElementChild) === null || _b === void 0 ? void 0 : _b.tagName) === 'span'.toUpperCase()) {
                this.removeErrors();
            }
            this._checkErrors();
            const errorContainer = document.createElement('span');
            errorContainer.classList.add('invalidFeedback');
            errorContainer.innerHTML = this.errors.join('<br/>');
            (_c = this.element) === null || _c === void 0 ? void 0 : _c.append(errorContainer);
        };
        this.removeErrors = () => {
            var _a, _b;
            this.errors = [];
            if (((_b = (_a = this.element) === null || _a === void 0 ? void 0 : _a.lastElementChild) === null || _b === void 0 ? void 0 : _b.tagName) === 'span'.toUpperCase()) {
                this.element.removeChild(this.element.lastElementChild);
            }
        };
        this.errors = [];
        const input = (_a = this.element) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('input');
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