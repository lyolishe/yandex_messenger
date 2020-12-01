import { Route } from './Route';
import Page from './components/Page/Page';
import { UserResponse } from '../types/Contracts';

export enum Routes {
    Login = '/login',
    Register = '/register',
    Chats = '/',
    Settings = '/settings',
}

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

    use(pathname: string, block: typeof Page): Router {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    static get instance(): Router {
        return Router.__instance ?? new Router('root');
    }

    start(user?: UserResponse): void {
        window.onpopstate = (event: PopStateEvent) => {
            event.preventDefault();
            this._onRoute((event.currentTarget as Window).location.pathname);
        };

        if (!user) {
            this._onRoute(Routes.Login);
        }

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);

        if (!route) {
            return this.redirect();
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        return route.render();
    }

    go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find((route) => route.match(pathname));
    }

    redirect(): void {
        this._onRoute(Routes.Chats);
    }
}
