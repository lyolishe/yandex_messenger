import Block, {DefaultBlockProps} from "../../Block.js";
import {FormItemBlock, FormItemBlockProps} from "./FormItem/FormItemBlock.js";
import {logFieldValues} from "../../../../scripts/formSubmit.js";

export type FormProps = {
    initialValues?: Record<string, string|number>
    id: string;
    method?: string;
}

export class Form extends Block<FormProps> {
    formItems: FormItemBlock[];
    constructor(props: DefaultBlockProps<FormProps>) {
        super('form', props!);
        this.formItems = [];
        this._attachFormItems();
        this.element?.setAttribute('novalidate', 'novalidate')
        this.element?.setAttribute('id', props.id)
        if (props.method){
            this.element?.setAttribute('method', props.method)
        }
        this.element?.addEventListener('submit', this._onSubmit.bind(this))
    }

    private readonly _attachFormItems = () => {
        const items = this.element?.getElementsByTagName('formitem');
        for (let item of items!) {
            const dataset = (item as HTMLElement).dataset;
            const initialValue = this.props?.initialValues?.[dataset['name']!];

            const formItem = new FormItemBlock({...dataset, initialValue} as FormItemBlockProps);
            this.formItems.push(formItem);
            item.parentNode?.insertBefore(formItem.element!, item);
            item.remove();
        }
    }

    private readonly _onSubmit = (e: Event) => {
        if (this.validateAll()) {
            e.preventDefault();
            return;
        }
        logFieldValues(e);
    }


    readonly validateAll  = (): boolean => {
        const errors = this.formItems.map(formItem => {
            formItem.appendErrors()
            return formItem.errors
        }).flat()
        return errors.length !== 0
    }

}