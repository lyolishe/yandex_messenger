import { Form } from "../../Form/Form.js";
export const loginFormTmpl = `
    <formitem data-name="login" data-type="text" data-minlength="5" data-label="login" data-required="true"></formitem>
`;
export const passwordFormTmpl = `
    <formitem data-name="password" data-type="password" data-minlength="6" data-label="Password" data-required="true" ></formitem>
`;
export class LoginForm extends Form {
    constructor(props) {
        super(props);
    }
    render() {
        return Handlebars.compile(loginFormTmpl)(this.props);
    }
}
export class PasswordForm extends Form {
    constructor(props) {
        super(props);
    }
    render() {
        return Handlebars.compile(passwordFormTmpl)(this.props);
    }
}
//# sourceMappingURL=LoginForm.js.map