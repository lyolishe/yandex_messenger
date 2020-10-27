import {Button, ButtonProps} from "../src/components/Button/Button.js";

const render = (id: string, block: HTMLElement ): void => {
    const target = document.getElementById(id);
    target?.appendChild(block);
}
const buttonProps: ButtonProps = {
    buttonType: "Primary",
    text: "click me!",
    onClick: () => {
        alert(1);
    }
}

const button = new Button(buttonProps);

render('root', button.getContent()!)

setTimeout(() => {
    button.setProps({text: "click me, click me, click me!!!!"})
}, 4000)