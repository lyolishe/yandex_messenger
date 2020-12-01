import EventBus from '../EventBus';

export const enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render',
}

export type DefaultBlockProps<T = Record<string, unknown>> = {
    classList?: string[];
    handlers?: Record<string, (...args: unknown[]) => void>;
    children?: Block[];
} & T

interface Meta<T = Record<string, unknown>> {
    tagName: keyof HTMLElementTagNameMap,
    props: DefaultBlockProps<T>
}

export default class Block<T = Record<string, unknown>> {
    props: DefaultBlockProps<T>;

    eventBus: ()=>EventBus;

    private _element: HTMLElement;

    private readonly _meta: Meta<DefaultBlockProps<T>>;

    private _subscriptions: Map<Element, Record<string, (...args: unknown[]) => void>>;

    private readonly _tmpl: string;

    constructor(tagName:keyof HTMLElementTagNameMap = 'div', props: DefaultBlockProps<T>, tmpl = '<children></children>') {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
        };
        this._tmpl = tmpl;

        if (props) {
            this.props = this._makePropsProxy(props);
        }
        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(EVENTS.INIT, this.init.bind(this));
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    private _createResources() {
        const { tagName } = this._meta!;
        this._element = this._createDocumentElement(tagName);
    }

    init(): void {
        this._createResources();
        this.eventBus().emit(EVENTS.FLOW_CDM);
    }

    private _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(EVENTS.FLOW_RENDER);
    }

    componentDidMount(): void {
        return undefined;
    }

    private _componentDidUpdate(oldProps: DefaultBlockProps<T>, newProps: DefaultBlockProps<T>) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(EVENTS.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: DefaultBlockProps<T>, newProps: DefaultBlockProps<T>): boolean {
        if (oldProps && newProps) {
            return true;
        }
        return true;
    }

    setProps = (nextProps: DefaultBlockProps<T>): void => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        return this._element;
    }

    private _render(): void {
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        this._element.innerHTML = block;

        if (this.props.classList) {
            this.element.classList.remove(...this.element.classList);
            this._element.classList.add(...this.props.classList);
        }

        this._attachListeners();
        this._placeChildren();
    }

    render():string {
        return this._tmpl;
    }

    getContent(): HTMLElement {
        return this.element;
    }

    private _makePropsProxy(props:DefaultBlockProps<T>):DefaultBlockProps<T> {
        const proxy = new Proxy<DefaultBlockProps<T> >(props, {
            set: (target, prop:keyof (DefaultBlockProps<T>), value) => {
                const oldProps = { ...this._meta?.props };
                if (target[prop] !== value) {
                    target[prop] = value;
                    this.eventBus().emit(EVENTS.FLOW_CDU, oldProps, this.props);
                }
                return true;
            },
            deleteProperty: () => {
                throw new Error('нет доступа');
            },
        });
        return proxy;
    }

    private _createDocumentElement(tagName: keyof HTMLElementTagNameMap) {
        // TODO: Нужно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    private _placeChildren() {
        const [place] = this._element.getElementsByTagName('children');

        if (this.props.children?.length && place) {
            this.props.children.forEach((child) => {
                place.parentElement?.append(child?.element);
            });
        }
        if (place) {
            place.remove();
        }
    }

    private _attachListeners(): void {
        this._gatherListeners();

        const iterator = this._subscriptions.entries();
        let item = iterator.next();
        while (!item.done) {
            const [elem, events] = item.value;
            Object.keys(events).forEach((eventName) => {
                elem.addEventListener(eventName, (events[eventName] as EventHandlerNonNull));
            });
            item = iterator?.next();
        }
    }

    private _gatherListeners() {
        const block = this._element;
        const stack = [block];
        const subscriptions: Map<Element, Record<string, (...args: unknown[]) => void>> = new Map();

        while (stack.length) {
            const current = stack.pop();
            if (!current) {
                break;
            }

            const attrs = Array.from(current.attributes).filter((attr) => attr.name.startsWith('on'));

            if (!attrs.length) {
                const children = Array.from(current.children);
                stack.push(...(children as HTMLElement[]));
                continue;
            }

            if (!subscriptions.get(current)) {
                subscriptions.set(current, {});
            }
            const events = subscriptions.get(current);

            attrs.forEach((attr) => {
                const eventName = attr.name.substring(2).toLocaleLowerCase();

                const handler = this.props.handlers![attr.value];

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

    show(): void {
        this.getContent().style.display = 'block';
    }

    hide(): void {
        this.getContent().style.display = 'none';
    }
}
