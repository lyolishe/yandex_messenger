/*import {Wrapper} from "../src/modules/components/Wrapper.js";
import Block from "../src/modules/components/Block.js";
import {Button} from "../src/modules/components/Button/Button.js";
import {render} from "../src/modules/Utilits.js";
import {passwordFormTmpl} from "../src/modules/components/Form/FormTamplates/LoginFormTmpl.js";
import {Form} from "../src/modules/components/Form/Form.js";

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
const submitBtn = new Button({form: "form", type: "submit", classList: ["btn", "btnPrimary", "mlAuto"], text: "Sign in"});

//TODO: Избавиться от этой временной головной боли!!!
if (cardHeader.element) {
    cardHeader.element.innerHTML = "<h3>Log In</h3>"
}

cardFooter.element?.appendChild(submitBtn.element)

const form = new Form(, onSubmit: data => data, onSubmit: data => data{id: "form", method: "ChatListPage.html"}, passwordFormTmpl);

cardBody.element?.appendChild(form.element);
card.appendChild(cardHeader.element);
card.appendChild(cardBody.element);
card.appendChild(cardFooter.element);

render('root', wrapper.element);*/
