import Block from "../Block.js";
export class Wrapper extends Block {
    constructor(props) {
        super('div', props);
        this._buildLayers = () => {
            this.props.layers.reduce((curr, next) => {
                curr === null || curr === void 0 ? void 0 : curr.appendChild(next.element);
                return next.element;
            }, this.element);
        };
        this._buildLayers();
    }
    get lastLayer() {
        let current = this.element;
        while (current === null || current === void 0 ? void 0 : current.lastElementChild) {
            current = current.lastElementChild;
        }
        return current;
    }
}
//# sourceMappingURL=Wrapper.js.map