import {Page} from "../../components/Page/Page.js";
import {Form} from "../../components/Form/Form.js";
import Block from "../../components/Block.js";
import {Button} from "../../components/Button/Button.js";
import {SingUpRequest, UserResponse} from "../../../data/Contracts.js";
import {Wrapper} from "../../components/Wrapper.js";
import {Card} from "../Card/Card.js";
import {AuthApi} from "../../../api/AuthApi.js";
import {useApi} from "../../Utilits.js";
import {Router} from "../../Router.js";
import {registerFormTmpl} from "../../components/Form/FormTamplates/RegisterFormTmpl.js";

export class RegisterPage extends Page {
    form: Form
    constructor() {
        super();

        this.form = new Form({id: "form"}, registerFormTmpl);

        const cardHeader = new Block('div', {classList: ["logInHeader"]}, "<h3>Log In</h3>");
        const cardFooter = new Block('div', {classList: ["loginFooter"],
            children: [
                new Button({form: "form", type: "submit", classList: ["btn", "btnPrimary", "w100"], text: "Sign up!",
                    onClick: () => {
                        if (this.form.validateAll()) {
                            return;
                        }
                        const formdata = this.form.getFieldValue<SingUpRequest>()
                        this.onSubmit(formdata)
                    }}
                ) //sign up Button
            ]
        })
        const cardBody = new Block('div', {classList: ["logInBody"], children: [this.form]})
        const wrapper = new Wrapper({
            classList: ["container", "flexColumn"],
            layers: [
                new Wrapper({classList: ["row", "myAuto"]}),
                new Wrapper({classList: ["col", "mxAuto"]}),
                new Card({header: cardHeader, body: cardBody, footer: cardFooter})
            ]}
        )
        this.setProps({children: [wrapper]})
    }

    onSubmit = (data: SingUpRequest) => {
        AuthApi.signUp(data).then(() => {
            useApi<UserResponse>(AuthApi.get()).then(user => {
                if (user) {
                    new Router('root').go('/')
                }
            })
        })
    }
}