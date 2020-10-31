import {Form, FormProps} from "../Form/Form.js";
import {loginFormTmpl} from "./LoginFormTmpl.js";

export class LoginForm extends Form {
    constructor(props: FormProps) {
        super(props);
    }
    render(): string {
        return Handlebars.compile(loginFormTmpl)(this.props)
    }
}