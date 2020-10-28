import { EventBus } from './EventBus.js';
export default class Block {
    constructor(tagName = "div", props) {
        this._element = null;
        this._meta = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props: props !== null && props !== void 0 ? props : {}
        };
        this.props = this._makePropsProxy(props);
        this.children = [];
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit("init" /* INIT */);
    }
    _registerEvents(eventBus) {
        eventBus.on("init" /* INIT */, this.init.bind(this));
        eventBus.on("flow:component-did-mount" /* FLOW_CDM */, this._componentDidMount.bind(this));
        eventBus.on("flow:render" /* FLOW_RENDER */, this._render.bind(this));
        eventBus.on("flow:component-did-update" /* FLOW_CDU */, this._componentDidUpdate.bind(this));
    }
    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
        if (this.props.classList) {
            this._element.classList.add(...this.props.classList);
        }
    }
    init() {
        this._createResources();
        this.eventBus().emit("flow:component-did-mount" /* FLOW_CDM */);
    }
    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit("flow:render" /* FLOW_RENDER */);
    }
    componentDidMount() {
    }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response)
            this.eventBus().emit("flow:render" /* FLOW_RENDER */);
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
        if (oldProps && newProps)
            return true;
    }
    get element() {
        return this._element;
    }
    _render() {
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        if (this._element)
            this._element.innerHTML = block;
    }
    render() {
        return '';
    }
    getContent() {
        return this.element;
    }
    _makePropsProxy(props) {
        const proxy = new Proxy(props, {
            set: (target, prop, value) => {
                var _a;
                const oldProps = Object.assign({}, (_a = this._meta) === null || _a === void 0 ? void 0 : _a.props);
                if (target[prop] !== value) {
                    target[prop] = value;
                    this.eventBus().emit("flow:component-did-update" /* FLOW_CDU */, oldProps, this.props);
                    return true;
                }
                else {
                    return false;
                }
            },
            deleteProperty: () => {
                throw new Error('нет доступа');
            }
        });
        return proxy;
    }
    _createDocumentElement(tagName) {
        //TODO: Нужно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }
    show() {
        if (this.getContent())
            this.getContent().style.display = "block";
    }
    hide() {
        if (this.getContent())
            this.getContent().style.display = "none";
    }
}
//# sourceMappingURL=Block.js.map