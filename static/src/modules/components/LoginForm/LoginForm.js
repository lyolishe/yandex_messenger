import { Form } from "../Form/Form.js";
import { loginFormTmpl } from "./LoginFormTmpl.js";
export class LoginForm extends Form {
    constructor(props) {
        super(props);
    }
    render() {
        return Handlebars.compile(loginFormTmpl)(this.props);
    }
}
//# sourceMappingURL=LoginForm.js.map