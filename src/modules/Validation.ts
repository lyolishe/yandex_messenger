import {splitCamelCase} from "./Utilits";

export type Validator = (val: string|number) => string|void;
// Проверяет валидность элемента
// Принимает на проверку элемент, кастомные сообщения и функциональные валидаторы.
// Каждый раз валидирует заново воизбежание повторных выводов.
export class Validation {
    private _errors: string[];
    private _input: HTMLInputElement
    validationMessages: Record<keyof ValidityState, string>;
    validators: Validator[]
    value: string | number;

    constructor(input: HTMLInputElement, validateMessages?: Record<keyof ValidityState, string>, validators?: Validator[]) {
        this._input = input
        this.validationMessages = validateMessages!;
        this.validators = validators!;
        this.value = input.value
    }

    private _checkValidity = () => {
        this._errors = [];
        const validity = this._input.validity
        for (let state in validity) {
            if (validity[state as keyof ValidityState] && state !== 'valid') {
                this._addError(this.validationMessages?.[state as keyof ValidityState]?? splitCamelCase(state).toLocaleLowerCase())
            }
        }

        this.validators?.forEach((validator) => {
            const res = validator(this.value)
            if(res) {
                this._addError(res)
            }
        })
    }

    private _addError = (str: string):void => {
        this._errors.push(str)
    }

    getValidityState = () => {
        this._checkValidity();
        return this._errors
    }
}