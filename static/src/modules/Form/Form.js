import Block from "../Block.js";
import { FormItemBlock } from "../FormItem/FormItemBlock.js";
import { logFieldValues } from "../../../scripts/formSubmit.js";
export class Form extends Block {
    constructor(props) {
        var _a, _b, _c, _d;
        super('form', props);
        this._attachFormItems = () => {
            var _a, _b, _c;
            const items = Array.from((_a = this.element) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('formitem')).reverse();
            while (items.length) {
                const item = items.pop();
                const dataset = item.dataset;
                const initialValue = (_c = (_b = this.props) === null || _b === void 0 ? void 0 : _b.initialValues) === null || _c === void 0 ? void 0 : _c[dataset['name']];
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
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.setAttribute('novalidate', 'novalidate');
        (_b = this.element) === null || _b === void 0 ? void 0 : _b.setAttribute('id', props.id);
        if (props.method) {
            (_c = this.element) === null || _c === void 0 ? void 0 : _c.setAttribute('method', props.method);
        }
        (_d = this.element) === null || _d === void 0 ? void 0 : _d.addEventListener('submit', this._onSubmit.bind(this));
    }
}
//# sourceMappingURL=Form.js.map