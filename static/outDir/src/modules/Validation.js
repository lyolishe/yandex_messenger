import { splitCamelCase } from "./Utilits.js";
// Проверяет валидность элемента
// Принимает на проверку элемент, кастомные сообщения и функциональные валидаторы.
// Каждый раз валидирует заново воизбежание повторных выводов.
export class Validation {
    constructor(input, validateMessages, validators) {
        this._checkValidity = () => {
            var _a, _b, _c;
            this._errors = [];
            const validity = this._input.validity;
            for (let state in validity) {
                if (validity[state] && state !== 'valid') {
                    this._addError((_b = (_a = this.validationMessages) === null || _a === void 0 ? void 0 : _a[state]) !== null && _b !== void 0 ? _b : splitCamelCase(state).toLocaleLowerCase());
                }
            }
            (_c = this.validators) === null || _c === void 0 ? void 0 : _c.forEach((validator) => {
                const res = validator(this.value);
                if (res) {
                    this._addError(res);
                }
            });
        };
        this._addError = (str) => {
            this._errors.push(str);
        };
        this.getValidityState = () => {
            this._checkValidity();
            return this._errors;
        };
        this._input = input;
        this.validationMessages = validateMessages;
        this.validators = validators;
        this.value = input.value;
    }
}
//# sourceMappingURL=Validation.js.map