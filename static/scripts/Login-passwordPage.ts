import {Wrapper} from "../src/modules/components/Wrapper.js";
import Block from "../src/modules/Block.js";
import {Button} from "../src/modules/components/Button/Button.js";
import {render} from "../src/modules/Utilits.js";
import {PasswordForm} from "../src/modules/components/LoginForm/PasswordForm.js";

const wrapper = new Wrapper({
    classList: ["container", "flexColumn"],
    layers: [
        new Block<{}>('div', {classList: ["row", "myAuto"]}),
        new Block<{}>('div', {classList: ["col", "mxAuto"]}),
        new Block<{}>('div', {classList: ["card", "logInCard"]})
    ]}
)
const card = wrapper.lastLayer;

const cardHeader = new Block('div', {classList: ["logInHeader"]});
const cardBody = new Block('div', {classList: ["logInBody"]})
const cardFooter = new Block('div', {classList: ["loginFooter"]})
const submitBtn = new Button({form: "form", type: "submit", classList: ["btn", "btnPrimary", "mlAuto"], text: "Sign in"});

//TODO: Избавиться от этой временной головной боли!!!
if (cardHeader.element) {
    cardHeader.element.innerHTML = "<h3>Log In</h3>"
}

cardFooter.element?.appendChild(submitBtn.element!)

const form = new PasswordForm({id: "form", method: "ChatListPage.html"});

cardBody.element?.appendChild(form.element!);
card.appendChild(cardHeader.element!);
card.appendChild(cardBody.element!);
card.appendChild(cardFooter.element!);

render('root', wrapper.element!);
