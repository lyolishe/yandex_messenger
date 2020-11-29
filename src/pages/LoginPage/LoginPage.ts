import {SignInRequest, UserResponse} from "../../types/Contracts";
import {AuthApi} from "../../api/AuthApi";
import {useApi} from "../../modules/Utilits";
import {Router} from "../../modules/Router";
import {Wrapper} from "../../modules/components/Wrapper";
import Block from "../../modules/components/Block";
import {Button} from "../../modules/components/Button/Button";
import {Form} from "../../modules/components/Form/Form";
import {loginFormTmpl, passwordFormTmpl} from "../../modules/components/Form/FormTamplates/LoginFormTmpl";
import {Card, CardFooter, CardHeader} from "../../modules/components/Card/Card";
import {Link} from "../../modules/components/Link";
import {Context} from "../../modules/Context";
import {Page} from "../../modules/components/Page/Page";

export class LoginPage extends Page{
    form: Form
    constructor() {
        super();

        this.form = new Form({id: "form"}, loginFormTmpl+passwordFormTmpl);

        const header = new CardHeader("<h3>Log In</h3>");
        const footer = new CardFooter(
            [
                new Link('/register', 'Sign Up'), //link to registration
                new Button({form: "form", type: "submit", classList: ["btn", "btnPrimary", "mlAuto"], text: "Sign in",
                    onClick: () => {
                        if (this.form.validateAll()) {
                            return;
                        }
                        this.onSubmit(this.form.getFieldValue<SignInRequest>())
                    }}
                ) //sign in Button
            ]
        )
        const body = new Block('div', {classList: ["logInBody"], children: [this.form]})
        const wrapper = new Wrapper({
            classList: ["container", "flexColumn"],
            layers: [
                new Wrapper({classList: ["row", "myAuto"]}),
                new Wrapper({classList: ["col", "mxAuto"]}),
                new Card({header, body, footer})
            ]}
        )
        this.setProps({children: [wrapper]})
    }

    onSubmit = (data: SignInRequest) => {
        AuthApi.signIn(data).then(() => {
            useApi<UserResponse>(AuthApi.get()).then(user => {
                if (user) {
                    Context.instance.set('user', user)
                    Router.instanse.go('/')
                }
            })
        })
    }
}