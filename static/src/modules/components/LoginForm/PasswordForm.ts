import {Form, FormProps} from "../../Form/Form.js";

export const passwordFormTmpl = `
    <formitem data-name="password" data-type="password" data-minlength="6" data-label="Password" data-required="true" ></formitem>
`

export class PasswordForm extends Form {
    constructor(props: FormProps) {
        super(props);
    }
    render(): string {
        return Handlebars.compile(passwordFormTmpl)(this.props)
    }
}