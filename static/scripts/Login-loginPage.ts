import {Wrapper} from "../src/modules/components/Wrapper.js";
import Block from "../src/modules/Block.js";
import {Button} from "../src/modules/components/Button/Button.js";
import {LoginForm} from "../src/modules/components/LoginForm/LoginForm.js";
import {render} from "../src/modules/Utilits.js";

const wrapper = new Wrapper({
    classList: ["container", "flexColumn"],
    layers: [
        new Wrapper({classList: ["row", "myAuto"]}),
        new Wrapper({classList: ["col", "mxAuto"]}),
        new Wrapper({classList: ["card", "logInCard"]})
    ]}
)
const card = wrapper.lastLayer;

const cardHeader = new Block('div', {classList: ["logInHeader"]});
const cardBody = new Block('div', {classList: ["logInBody"]})
const cardFooter = new Block('div', {classList: ["loginFooter"]})
const submitBtn = new Button({form: "form", type: "submit", classList: ["btn", "btnCircleOutline"], text: ""});

//TODO: Избавиться от этой временной головной боли!!!
if (cardHeader.element) {
    cardHeader.element.innerHTML = "<h3>Log In</h3>"
}
if (cardFooter.element){
    cardFooter.element.innerHTML = "<a href=\"RegisterPage.html\" class=\"link\">Sign In</a>"
}
if (submitBtn.element){
    submitBtn.element.innerHTML = "<span class=\"mdi mdi-arrow-right\"></span>"
    cardFooter.element?.appendChild(submitBtn.element)
}

const form = new LoginForm({id: "form", method: "Login-passwordPage.html"});

cardBody.element?.appendChild(form.element!);
card.appendChild(cardHeader.element!);
card.appendChild(cardBody.element!);
card.appendChild(cardFooter.element!);

render('root', wrapper.element!);
