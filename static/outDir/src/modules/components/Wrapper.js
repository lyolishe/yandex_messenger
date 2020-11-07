import Block from "../Block.js";
//TODO: Тоже треш, перепридумать заполнение слоёв
export class Wrapper extends Block {
    constructor(props) {
        super('div', props);
        this._buildLayers = () => {
            if (this.props.layers) {
                this.props.layers.reduce((curr, next) => {
                    curr.appendChild(next.element);
                    return next.element;
                }, this.element);
            }
        };
        this._buildLayers();
    }
    get lastLayer() {
        let current = this.element;
        while (current.lastElementChild) {
            current = current.lastElementChild;
        }
        return current;
    }
}
//# sourceMappingURL=Wrapper.js.map