export function logFieldValues(ev) {
    const values = {};
    const inputs = ev.target.getElementsByTagName("input");
    for (const input of inputs) {
        values[input.name] = input.value;
    }
    console.log(values);
}
//# sourceMappingURL=formSubmit.js.map