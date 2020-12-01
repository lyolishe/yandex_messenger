import { isEqual, render } from './Utilits';
import Page from './components/Page/Page';

export type RouteProps = {
    rootQuery: string;
}

export class Route {
    pathname: string;

    private readonly _blockClass: typeof Page;

    private _block: Page | null;

    private _props: RouteProps;

    constructor(pathname: string, view: typeof Page, props: RouteProps) {
        this.pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this.pathname);
    }

    render(): void {
        if (!this._block) {
            this._block = new this._blockClass();
            return render(this._props.rootQuery, this._block.element!);
        }

        return this._block.show();
    }
}
