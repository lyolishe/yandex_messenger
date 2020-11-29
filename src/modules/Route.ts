import {isEqual, render} from "./Utilits";
import {Page} from "./components/Page/Page";

export type RouteProps  = {
    rootQuery: string;
}

export class Route {
    pathname: string;
    private readonly _blockClass: typeof Page;
    private _block: Page | null;
    private _props: RouteProps

    constructor(pathname: string, view: typeof Page, props: RouteProps) {
        this.pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this.pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block?.element!);
            return;
        }

        this._block.show();
    }
}