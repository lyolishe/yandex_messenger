import { Form } from "../../Form/Form.js";
export const loginFormTmpl = `
    <formitem data-name="login" data-type="text" data-minlength="5" data-label="login" data-required="true"/>
`;
export class LoginForm extends Form {
    constructor(props) {
        super(props);
    }
    render() {
        return Handlebars.compile(loginFormTmpl)(this.props);
    }
}
//# sourceMappingURL=LoginForm.js.map