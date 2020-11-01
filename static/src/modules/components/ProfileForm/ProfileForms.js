import { Form } from "../../Form/Form.js";
import { changePasswordTmpl, profileSettingsTmpl } from "./ProfileFormTmpl.js";
import { Button } from "../Button/Button.js";
//TODO: НУ ДУБЛИТСЯ ЖЕ 1 В 1 - ПЕРЕПРИДУМАТЬ!
export class ChangePasswordForm extends Form {
    constructor(props) {
        var _a, _b, _c;
        super(props);
        const submitBtn = new Button({ text: "Change password", classList: ["btn", "btnPrimary", "w100"], type: "submit" });
        (_b = (_a = this.element) === null || _a === void 0 ? void 0 : _a.lastElementChild) === null || _b === void 0 ? void 0 : _b.appendChild(submitBtn.element);
        (_c = this.element) === null || _c === void 0 ? void 0 : _c.setAttribute('id', props.id);
    }
    render() {
        return Handlebars.compile(changePasswordTmpl)(this.props);
    }
}
export class ProfileSettingsForms extends Form {
    constructor(props) {
        var _a, _b, _c;
        super(props);
        const submitBtn = new Button({ text: "Save profile changes", classList: ["btn", "btnPrimary", "w100"], type: "submit" });
        (_b = (_a = this.element) === null || _a === void 0 ? void 0 : _a.lastElementChild) === null || _b === void 0 ? void 0 : _b.appendChild(submitBtn.element);
        (_c = this.element) === null || _c === void 0 ? void 0 : _c.setAttribute('id', props.id);
    }
    render() {
        return Handlebars.compile(profileSettingsTmpl)(this.props);
    }
}
//# sourceMappingURL=ProfileForms.js.map