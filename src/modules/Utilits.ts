export function useApi<T>(result: Promise<XMLHttpRequest>): Promise<T> {
    return result.then((response) => {
        if (/^([4,5])/.test(response.status.toString())) {
            throw new Error(response.statusText);
        }
        return JSON.parse(response.response) as T;
    });
}

export const render = (id: string, block: HTMLElement): void => {
    const target = document.getElementById(id);
    target?.appendChild(block);
};

export function splitCamelCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function isEqual(lhs: unknown, rhs: unknown): boolean {
    return lhs === rhs;
}

export type StringIndexed = Record<string, unknown>

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
                [`${key}[${objKey}]`]: (value as StringIndexed)[objKey],
            }), {});

            return `${result}${queryStringify(objValue)}${endLine}`;
        }

        return `${result}${key}=${value}${endLine}`;
    }, '');
}

export const BasePath = 'https://ya-praktikum.tech';
