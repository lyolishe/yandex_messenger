import { Form } from "../../Form/Form.js";
export const passwordFormTmpl = `
    <formitem data-name="password" data-type="password" data-minlength="6" data-label="Password" data-required="true"/>
`;
export class PasswordForm extends Form {
    constructor(props) {
        super(props);
    }
    render() {
        return Handlebars.compile(passwordFormTmpl)(this.props);
    }
}
//# sourceMappingURL=PasswordForm.js.map