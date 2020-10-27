export const enum Events {
    INIT = "init",
    FLOW_CDM = "flow:component-did-mount",
    FLOW_CDU = "flow:component-did-update",
    FLOW_RENDER = "flow:render",
}

interface Meta<T> {
    tagName:keyof HTMLElementTagNameMap,
    props: T
}

export default class Block<T extends Record<string, unknown>> {
    props: T;
    eventBus: ()=>EventBus;

    private _element: HTMLElement | null = null;
    private readonly _meta: Meta<T> | null = null;

    constructor(tagName:keyof HTMLElementTagNameMap = "div", props: T) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props: props?? {}
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Events.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Events.INIT, this.init.bind(this));
        eventBus.on(Events.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Events.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Events.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta!;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Events.FLOW_CDM)
    }

    _componentDidMount() {
        this.componentDidMount(this._meta?.props);
        this.eventBus().emit(Events.FLOW_RENDER);
    }

    componentDidMount(oldProps?: T) {
        return oldProps
    }

    private _componentDidUpdate(oldProps: T, newProps: T) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if(response) this.eventBus().emit(Events.FLOW_RENDER);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: T, newProps: T) {
        if(oldProps && newProps)
        return true;
    }

    setProps = (nextProps: T) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement | null {
        return this._element;
    }

    private _render() {
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        if(this._element) this._element.innerHTML = block;
    }

    render():string {
        return ''
    }

    getContent(): HTMLElement| null{
        return this.element;
    }

    private _makePropsProxy(props:T):T {

        const proxy = new Proxy<T >(props, {
            set: (target, prop:keyof (T), value) => {
                const oldProps = { ...this._meta?.props };
                if (target[prop] !== value) {
                    target[prop] = value;
                    this.eventBus().emit(Events.FLOW_CDU, oldProps, this.props);
                    return true;
                } else {
                    return false;
                }
            },
            deleteProperty: ()=> {

                throw new Error('нет доступа')
            }

        })

        return proxy;
    }

    _createDocumentElement(tagName: keyof HTMLElementTagNameMap) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        if(this.getContent()) this.getContent()!.style.display = "block"
    }

    hide() {
        if(this.getContent()) this.getContent()!.style.display = "none"
    }
}