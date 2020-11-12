import {Page} from "../../components/Page/Page.js";
import {SignInRequest, UserResponse} from "../../../data/Contracts.js";
import {AuthApi} from "../../../api/AuthApi.js";
import {useApi} from "../../Utilits.js";
import {Router} from "../../Router.js";
import {Wrapper} from "../../components/Wrapper.js";
import Block from "../../components/Block.js";
import {Button} from "../../components/Button/Button.js";
import {Form} from "../../components/Form/Form.js";
import {loginFormTmpl, passwordFormTmpl} from "../../components/Form/FormTamplates/LoginFormTmpl.js";
import {Card} from "../Card/Card.js";
import {Link} from "../Link.js";

export class LoginPage extends Page{
    form: Form
    constructor() {
        super();

        this.form = new Form({id: "form"}, loginFormTmpl+passwordFormTmpl);

        const cardHeader = new Block('div', {classList: ["logInHeader"]}, "<h3>Log In</h3>");
        const cardFooter = new Block('div', {classList: ["loginFooter"],
            children: [
                new Link('/register', 'Sign Up'), //link to registration
                new Button({form: "form", type: "submit", classList: ["btn", "btnPrimary", "mlAuto"], text: "Sign in",
                    onClick: () => {
                        if (this.form.validateAll()) {
                            return;
                        }
                        const formdata = this.form.getFieldValue<SignInRequest>()
                        this.onSubmit(formdata)
                    }}
                ) //sign in Button
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

    onSubmit = (data: SignInRequest) => {
        AuthApi.signIn(data).then(() => {
            useApi<UserResponse>(AuthApi.get()).then(user => {
                if (user) {
                    new Router('root').go('/')
                }
            })
        })
    }
}