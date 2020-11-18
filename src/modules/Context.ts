export class Context {
    private static __instance: Context;
    private _data: Record<string, unknown>
    constructor(data?: Record<string, unknown>) {
        if (Context.__instance) {
            return Context.__instance;
        }
        this._data = data?? {};
        Context.__instance = this;
    }

    get(key: string): Record<string, unknown> {
        return this._data[key] as Record<string, unknown>;
    }

    static get instance() {
        return Context.__instance?? new Context()
    }

    set(key: string, value: unknown) {
        this._data[key] = value;
    }
}