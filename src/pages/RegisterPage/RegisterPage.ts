import { Form } from '../../modules/components/Form/Form';
import Block from '../../modules/components/Block';
import { Button } from '../../modules/components/Button/Button';
import { SingUpRequest, UserResponse } from '../../types/Contracts';
import { Wrapper } from '../../modules/components/Wrapper';
import AuthApi from '../../api/AuthApi';
import { useApi } from '../../modules/Utilits';
import { Router } from '../../modules/Router';
import Page from '../../modules/components/Page/Page';
import registerFormTmpl from '../../modules/components/Form/FormTamplates/RegisterFormTmpl';
import CardFooter from '../../modules/components/Card/CardFooter';
import CardHeader from '../../modules/components/Card/CardHeader';
import { Card } from '../../modules/components/Card/Card';

export default class RegisterPage extends Page {
    form: Form

    constructor() {
        super();

        this.form = new Form({ id: 'form' }, registerFormTmpl);

        const header = new CardHeader('<h3>Log In</h3>');
        const footer = new CardFooter(
            [
                new Button({
                    form: 'form',
                    type: 'submit',
                    classList: ['btn', 'btnPrimary', 'w100'],
                    text: 'Sign up!',
                    onClick: () => {
                        if (this.form.validateAll()) {
                            return;
                        }
                        const formdata = this.form.getFieldsValue<SingUpRequest>();
                        this.onSubmit(formdata);
                    },
                }), // sign up Button
            ],
        );
        const body = new Block('div', { classList: ['logInBody'], children: [this.form] });
        const wrapper = new Wrapper({
            classList: ['container', 'flexColumn'],
            layers: [
                new Wrapper({ classList: ['row', 'myAuto'] }),
                new Wrapper({ classList: ['col', 'mxAuto'] }),
                new Card({ header, body, footer }),
            ],
        });
        this.setProps({ children: [wrapper] });
    }

    onSubmit = (data: SingUpRequest): void => {
        AuthApi.signUp(data).then(() => {
            useApi<UserResponse>(AuthApi.get()).then((user) => {
                if (user) {
                    new Router('root').go('/');
                }
            });
        });
    }
}
