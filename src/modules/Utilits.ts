
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

export function useApi<T>(result: Promise<XMLHttpRequest>): Promise<T> {
    return result.then(response => {
        if (/^([4,5])/.test(response.status.toString())){
            throw new Error(response.statusText)
        }
        return JSON.parse(response.response) as T
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

export type StringIndexed = Record<string, any>

export function queryStringify(data: StringIndexed): string | never {
    if (!data) {
        return '';
    }

    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        const value = data[key];
        const endLine = index < keys.length - 1 ? '&' : '';

        if (Array.isArray(value)) {
            const arrayValue = value.reduce<StringIndexed>((result, arrData, index) => ({
                ...result,
                [`${key}[${index}]`]: arrData,
            }), {});

            return `${result}${queryStringify(arrayValue)}${endLine}`;
        }

        if (typeof value === 'object' && value !== null) {
            const objValue = Object.keys(value).reduce<StringIndexed>((result, objKey) => ({
                ...result,
                [`${key}[${objKey}]`]: value[objKey],
            }), {});

            return `${result}${queryStringify(objValue)}${endLine}`;
        }

        return `${result}${key}=${value}${endLine}`;
    }, '');
}

export const BasePath = `https://ya-praktikum.tech`