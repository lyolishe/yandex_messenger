import {EventBus} from '../EventBus.js'

export const enum Events {
    INIT = "init",
    FLOW_CDM = "flow:component-did-mount",
    FLOW_CDU = "flow:component-did-update",
    FLOW_RENDER = "flow:render",
}

interface Meta<T ={}> {
    tagName:keyof HTMLElementTagNameMap,
    props: DefaultBlockProps<T>
}

export type DefaultBlockProps<T = {}>  = {
    classList?: string[];
    handlers?: Record<string, Function>;
    children?: Block[];
} & T

export default class Block<T = {}> {
    props: DefaultBlockProps<T>;
    eventBus: ()=>EventBus;

    private _element: HTMLElement;
    private readonly _meta: Meta<DefaultBlockProps<T>>;
    private _subscriptions: Map<Element, Record<string, Function>>;
    private _tmpl?: string;

    constructor(tagName:keyof HTMLElementTagNameMap = "div", props: DefaultBlockProps<T>, tmpl?: string) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props: props
        };
        this._tmpl = tmpl;

        if(props){
            this.props = this._makePropsProxy(props);
        }
        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Events.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Events.INIT, this.init.bind(this));
        eventBus.on(Events.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Events.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Events.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    private _createResources() {
        const { tagName } = this._meta!;
        this._element = this._createDocumentElement(tagName);
        if (this.props.classList) {
            this._element.classList.add(...this.props.classList)
        }
    }

    init() {
        this._createResources();
        this.eventBus().emit(Events.FLOW_CDM)
    }

    private _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Events.FLOW_RENDER);
    }

    componentDidMount() {
    }

    private _componentDidUpdate(oldProps: DefaultBlockProps<T>, newProps: DefaultBlockProps<T>) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if(response) this.eventBus().emit(Events.FLOW_RENDER);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: DefaultBlockProps<T>, newProps: DefaultBlockProps<T>) {
        if(oldProps && newProps)
        return true;
    }

    setProps = (nextProps: DefaultBlockProps<T>) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        return this._element;
    }

    private _render() {
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        this._element.innerHTML = block;
        this._attachListeners()
        this._placeChildren()
    }

    render():string {
        return this._tmpl? this._tmpl : this._element.innerHTML?? ''
    }

    getContent(): HTMLElement{
        return this.element;
    }

    private _makePropsProxy(props:DefaultBlockProps<T>):DefaultBlockProps<T> {

        const proxy = new Proxy<DefaultBlockProps<T> >(props, {
            set: (target, prop:keyof (DefaultBlockProps<T>), value) => {
                const oldProps = { ...this._meta?.props };
                if (target[prop] !== value) {
                    target[prop] = value;
                    this.eventBus().emit(Events.FLOW_CDU, oldProps, this.props);
                }
                return true;
            },
            deleteProperty: ()=> {

                throw new Error('нет доступа')
            }

        })

        return proxy;
    }

    private _createDocumentElement(tagName: keyof HTMLElementTagNameMap) {
        //TODO: Нужно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    private _placeChildren() {
        const place = this._element.getElementsByTagName('children')[0]

        if (this.props.children?.length && place) {
            this.props.children.forEach(child => {
                place && place.parentElement?.appendChild(child.element);
            })
            place.remove();
        }
    }

    private _attachListeners(): void {
        this._gatherListeners();

        const iterator = this._subscriptions?.entries();
        let item = iterator?.next();
        while (!item?.done) {
            const [elem, events] = item?.value!;
            Object.keys(events).forEach(eventName => {
                elem.addEventListener(eventName, (events[eventName] as EventHandlerNonNull));
            });
            item = iterator?.next();
        }
    }

    private _gatherListeners() {
        const block = this._element;
        const stack = [block];
        const subscriptions: Map<Element, Record<string, Function>> = new Map();

        while (stack.length) {
            const current = stack.pop();
            if (!current)
                break;
            const attrs = Array.from(current.attributes).filter(attr => attr.name.startsWith('on'));

            if (!attrs.length) {
                const children = Array.from(current.children);
                stack.push(...(children as HTMLElement[]));
                continue;
            }

            if (!subscriptions.get(current)) {
                subscriptions.set(current, {});
            }
            const events = subscriptions.get(current);


            attrs.forEach(attr => {
                const eventName = attr.name.substring(2).toLocaleLowerCase();

                const handler = (this.props.handlers as Record<string, Function>)[attr.value]

                if (events) {
                    events[eventName] = handler;
                }

                current.removeAttribute(attr.name);
            });
            const children = Array.from(current.children);
            stack.push(...(children as HTMLElement[]));
        }

        this._subscriptions = subscriptions;
    }

    show() {
        if(this.getContent()) {
            this.getContent()!.style.display = "block"
        }
    }

    hide() {
        if(this.getContent()) {
            this.getContent()!.style.display = "none"
        }
    }
}