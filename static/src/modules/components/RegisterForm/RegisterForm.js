import { Form } from "../../Form/Form.js";
import { registerFormTmpl } from "./RegisterFormTmpl.js";
export class RegisterForm extends Form {
    constructor(props) {
        super(props);
    }
    render() {
        return Handlebars.compile(registerFormTmpl)(this.props);
    }
}
//# sourceMappingURL=RegisterForm.js.map