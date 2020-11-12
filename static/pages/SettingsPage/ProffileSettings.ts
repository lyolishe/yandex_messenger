import Block from "../../src/modules/components/Block.js";
import {Wrapper} from "../../src/modules/components/Wrapper.js";
import {ChangeAvatar} from "../../src/modules/blocks/ChangeAvatar/ChangeAvatar.js";
import {Form} from "../../src/modules/components/Form/Form.js";
import {changePasswordTmpl, profileSettingsTmpl} from "../../src/modules/components/Form/FormTamplates/ProfileFormTmpl.js";
import {UserBlock} from "../../src/modules/blocks/UserBlock/UserBlock.js";

export const createProfileSettings = (): Block => {
    const appWrapper = new Wrapper({classList: ['appMainWrap']})
    const appManin = new Wrapper({classList: ['appMain']})

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
        children: [new ChangeAvatar({}),new Form({id: 'ChangePassword'}, changePasswordTmpl)]
    })
    const profileSettingsColumn = new Wrapper({
        classList: ["col-6"],
        children: [new Form({id: "ProfileSettings"}, profileSettingsTmpl)]
    })
    const formRow = new Wrapper({classList: ["row"], children: [changePasswordColumn, profileSettingsColumn]})

    formsWrapper.lastLayer.appendChild(formRow.element)

    const nav = new Block('nav', {classList: ["navbar"], children: [new UserBlock({first_name: "Profile"})]})

    appManin.element.appendChild(nav.element);
    appManin.element.appendChild(formsWrapper.element);
    appWrapper.lastLayer.appendChild(appManin.element)

    return new Block('main', {children: [appWrapper]})
}