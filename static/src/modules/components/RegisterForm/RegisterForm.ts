import {Form, FormProps} from "../../Form/Form.js";
import {registerFormTmpl} from "./RegisterFormTmpl.js";

export class RegisterForm extends Form{
    constructor(props: FormProps) {
        super(props);
    }
    render(): string {
        return Handlebars.compile(registerFormTmpl)(this.props)
    }
}