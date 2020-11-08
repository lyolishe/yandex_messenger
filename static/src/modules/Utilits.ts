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

export function api<T>(url: string): Promise<T> {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
}

export const render = (id: string, block: HTMLElement ): void => {
    const target = document.getElementById(id);
    target?.appendChild(block);
}

export function splitCamelCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2')
}

export function logFieldValues(ev: Event) {
    const values: Record<string, unknown> = {};
    const inputs = (ev.target as HTMLFormElement).getElementsByTagName("input")
    for (const input of inputs) {
        values[input.name] = input.value
    }
    console.log(values)
}

export function isEqual(lhs: unknown, rhs: unknown) {
    return lhs === rhs;
}