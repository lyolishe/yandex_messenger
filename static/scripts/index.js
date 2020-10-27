import { Button } from "../src/components/Button/Button.js";
const render = (id, block) => {
    const target = document.getElementById(id);
    target === null || target === void 0 ? void 0 : target.appendChild(block);
};
const buttonProps = {
    buttonType: "Primary",
    text: "click me!",
    onClick: () => {
        alert(1);
    }
};
const button = new Button(buttonProps);
render('root', button.getContent());
setTimeout(() => {
    button.setProps({ text: "click me, click me, click me!!!!" });
}, 4000);
//# sourceMappingURL=index.js.map