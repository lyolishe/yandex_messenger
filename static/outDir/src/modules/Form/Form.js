import Block from "../Block.js";
import { FormItemBlock } from "./FormItem/FormItemBlock.js";
import { logFieldValues } from "../Utilits.js";
export class Form extends Block {
    constructor(props, tmpl) {
        super('form', props, tmpl);
        this._attachFormItems = () => {
            var _a;
            const items = Array.from(this.element.getElementsByTagName('formitem')).reverse();
            while (items.length) {
                const item = items.pop();
                const dataset = item.dataset;
                const initialValue = (_a = this.props.initialValues) === null || _a === void 0 ? void 0 : _a[dataset['name']];
                const formItem = new FormItemBlock(Object.assign(Object.assign({}, dataset), { initialValue }));
                this.formItems.push(formItem);
                item === null || item === void 0 ? void 0 : item.after(formItem.element);
                item === null || item === void 0 ? void 0 : item.remove();
            }
        };
        this._onSubmit = (e) => {
            if (this.validateAll()) {
                e.preventDefault();
                return;
            }
            logFieldValues(e);
        };
        this.validateAll = () => {
            const errors = this.formItems.map(formItem => {
                formItem.appendErrors();
                return formItem.errors;
            }).flat();
            return errors.length !== 0;
        };
        this.formItems = [];
        this._attachFormItems();
        this.element.setAttribute('novalidate', 'novalidate');
        this.element.setAttribute('id', props.id);
        if (props.method) {
            this.element.setAttribute('method', props.method);
        }
        this.element.addEventListener('submit', this._onSubmit.bind(this));
    }
}
//# sourceMappingURL=Form.js.map