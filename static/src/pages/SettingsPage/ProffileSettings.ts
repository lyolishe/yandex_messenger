import Block from "../../modules/components/Block.js";
import {Wrapper} from "../../modules/components/Wrapper.js";
import {ChangeAvatar} from "../../modules/blocks/ChangeAvatar/ChangeAvatar.js";
import {Form} from "../../modules/components/Form/Form.js";
import {changePasswordTmpl, profileSettingsTmpl} from "../../modules/components/Form/FormTamplates/ProfileFormTmpl.js";
import {UserBlock} from "../../modules/blocks/UserBlock/UserBlock.js";
import {Context} from "../../modules/Context.js";
import {UserRequest} from "../../data/Contracts.js";
import {UsersApi} from "../../api/UsersApi.js";
import {useApi} from "../../modules/Utilits.js";
import {Button} from "../../modules/components/Button/Button.js";

export const createProfileSettings = (): Block => {
    const appWrapper = new Wrapper({classList: ['appMainWrap']})
    const appManin = new Wrapper({classList: ['appMain']})

    const user = new Context().get('user') as Record<string, number|string>

    const changePasswordForm = new Form({id: 'ChangePassword'}, changePasswordTmpl);
    const onChangePassword = () => {
        useApi<void>(UsersApi.changePassword(changePasswordForm.getFieldValue()))
    }

    const profileForm = new Form({id: "ProfileSettings", initialValues: user}, profileSettingsTmpl)
    const onSubmitProfile = () => {
        useApi<UserRequest>(UsersApi.changeProfile(profileForm.getFieldValue())).then(res => new Context().set('user', res))
    }

    const formsWrapper = new Wrapper({
        classList:["row", "myAuto"],
        layers:[
            new Wrapper( {classList: ["col", "mxAuto"]}),
            new Wrapper({classList: ["card"]}),
            new Wrapper({classList: ["cardBody"]}),
        ]
    })

    const changePasswordColumn = new Wrapper({
        classList: ["col-6"],
        children: [
            new ChangeAvatar(user),
            changePasswordForm,
            new Button({text: "Change password", classList: ["btn", "btnPrimary", "w100"], onClick: onChangePassword, type: "submit"})
        ]
    })
    const profileSettingsColumn = new Wrapper({
        classList: ["col-6"],
        children: [
            profileForm,
            new Button({text: "Change profile", classList: ["btn", "btnPrimary", "w100"], onClick: onSubmitProfile, type: "submit"})
        ]
    })
    const formRow = new Wrapper({classList: ["row"], children: [changePasswordColumn, profileSettingsColumn]})

    formsWrapper.lastLayer.appendChild(formRow.element)

    const nav = new Block('nav', {classList: ["navbar"], children: [new UserBlock({first_name: "Profile"})]})

    appManin.element.appendChild(nav.element);
    appManin.element.appendChild(formsWrapper.element);
    appWrapper.lastLayer.appendChild(appManin.element)

    return new Block('main', {children: [appWrapper]})
}