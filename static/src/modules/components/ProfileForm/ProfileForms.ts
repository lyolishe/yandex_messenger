import {Form, FormProps} from "../../Form/Form.js";
import {changePasswordTmpl, profileSettingsTmpl} from "./ProfileFormTmpl.js";
import {Button} from "../Button/Button.js";


//TODO: НУ ДУБЛИТСЯ ЖЕ 1 В 1 - ПЕРЕПРИДУМАТЬ!
export class ChangePasswordForm extends Form {
    constructor(props: FormProps) {
        super(props);
        const submitBtn = new Button({text:"Change password", classList:["btn", "btnPrimary", "w100"], type: "submit"})
        this.element?.lastElementChild?.appendChild(submitBtn.element!)
        this.element?.setAttribute('id', props.id)
    }

    render(): string {
        return Handlebars.compile(changePasswordTmpl)(this.props)
    }
}

export class ProfileSettingsForms extends Form {
    constructor(props: FormProps) {
        super(props);
        const submitBtn = new Button({text:"Save profile changes", classList:["btn", "btnPrimary", "w100"], type: "submit"})
        this.element?.lastElementChild?.appendChild(submitBtn.element!)
        this.element?.setAttribute('id', props.id)
    }

    render(): string {
        return Handlebars.compile(profileSettingsTmpl)(this.props)
    }
}