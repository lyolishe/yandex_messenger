function logFieldValues(ev) {
    ev.preventDefault()
    const values={};
    const inputs = ev.target.getElementsByTagName("input")
    for (const input of inputs) {
        values[input.name] = input.value
    }
    console.log(values)
}