import {Route} from "./Route.js";
import {Page} from "./components/Page/Page";

export class Router {
    private static __instance: Router;
    routes: Route[];
    history: History;
    private _currentRoute?: Route |null;
    private readonly _rootQuery: string;
    
    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: typeof Page) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            event.preventDefault()
            this._onRoute((event.currentTarget as Window).location.pathname)
        }).bind(this)
        this._onRoute(window.location.pathname)
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if(!route) {
            this.redirect();
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }

    redirect() {
        this._onRoute(this.routes[0].pathname)
    }
}