import Block, {DefaultBlockProps} from "../Block.js";
import {FormItemBlock, FormItemBlockProps} from "./FormItem/FormItemBlock.js";

export type FormProps = {
    initialValues?: Record<string, string|number>
    id: string;
    method?: string;
}

export class Form extends Block<FormProps> {
    formItems: FormItemBlock[];
    constructor(props: DefaultBlockProps<FormProps>, tmpl: string) {
        super('form', props, tmpl);
        this.formItems = [];
        this._attachFormItems();
        this.element.setAttribute('novalidate', 'novalidate')
        this.element.setAttribute('id', props.id)
        if (props.method){
            this.element.setAttribute('method', props.method)
        }
    }

    private readonly _attachFormItems = () => {
        const items = Array.from(this.element.getElementsByTagName('formitem')!).reverse();

        while (items.length) {
            const item = items.pop()
            const dataset = (item as HTMLElement).dataset;
            const initialValue = this.props.initialValues?.[dataset['name']!];
            const formItem = new FormItemBlock({...dataset, initialValue} as FormItemBlockProps);
            this.formItems.push(formItem);
            item?.after(formItem.element!);
            item?.remove()
        }

    }

    getFieldValue = <T>(): T => {
        return (Object.fromEntries(this.formItems.map(item => [item.name, item.value])) as unknown as T)
    }

    readonly validateAll  = (): boolean => {
        const errors = this.formItems.map(formItem => {
            formItem.appendErrors()
            return formItem.errors
        }).flat()
        return errors.length !== 0
    }

}