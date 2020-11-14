export class Context {
    private static __instanse: Context;
    private _data: Record<string, unknown>
    constructor(data?: Record<string, unknown>) {
        if (Context.__instanse) {
            return Context.__instanse;
        }
        this._data = data?? {};
        Context.__instanse = this;
    }

    get(key: string) {
        return this._data[key];
    }

    set(key: string, value: unknown) {
        this._data[key] = value;
    }
}