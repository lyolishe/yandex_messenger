export function get<T extends Record<string, any>> (obj: T, path: string, defaultValue:unknown = ''): unknown {
    const keys = path.split('.');
    let result = obj;
    for (let key of keys) {
        const value =  result[key];

        if (!value) {
            return defaultValue;
        }

        result = value;
    }

    return result?? defaultValue;
}