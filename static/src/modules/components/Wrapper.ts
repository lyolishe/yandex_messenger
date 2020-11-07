import Block, {DefaultBlockProps} from "../Block.js";

export type WrapperProps = {
    layers?: Wrapper[]
    classList: string[]
}

//TODO: Тоже треш, перепридумать заполнение слоёв
export class Wrapper extends Block<WrapperProps> {
    constructor(props: DefaultBlockProps<WrapperProps>) {
        super('div', props)
        this._buildLayers()
    }

    get lastLayer(): HTMLElement {
        let current = this.element;
        while (current.lastElementChild) {
            current = current.lastElementChild as HTMLElement ;
        }
        return current;
    }

    private _buildLayers = () => {
        if (this.props.layers) {
            this.props.layers.reduce((curr, next) => {
                curr.appendChild(next.element);
                return next.element
            }, this.element)
        }
    }
}