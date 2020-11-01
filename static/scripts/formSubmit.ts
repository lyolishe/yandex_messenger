export function logFieldValues(ev: Event) {
    const values: Record<string, unknown> = {};
    const inputs = (ev.target as HTMLFormElement).getElementsByTagName("input")
    for (const input of inputs) {
        values[input.name] = input.value
    }
    console.log(values)
}
