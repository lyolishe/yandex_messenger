export function get(obj, path, defaultValue = '') {
    const keys = path.split('.');
    let result = obj;
    for (let key of keys) {
        const value = result[key];
        if (!value) {
            return defaultValue;
        }
        result = value;
    }
    return result !== null && result !== void 0 ? result : defaultValue;
}
export function api(url) {
    return fetch(url)
        .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}
export const render = (id, block) => {
    const target = document.getElementById(id);
    target === null || target === void 0 ? void 0 : target.appendChild(block);
};
//# sourceMappingURL=Utilits.js.map