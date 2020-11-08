//TODO: Сделать нормальный компонент под смену аватарки

import Block from "../../components/Block.js";
import {User} from "../../../data/Contracts.js";

export const changeAvatarTmpl = `
<div class="col mxAuto"
    <div class="avatarFull">
        <img src="{{avatarUrl}}" alt="avatar">
    </div>
    <button class="btn btnPrimary mdi mdi-folder-upload-outline w100 mt3"> Change</button>
</div>
`

export class ChangeAvatar extends Block<User> {
    constructor(props:User) {
        super('div', {...props, classList: ["row"], avatarUrl: "../img/Group%20216.png"});
    }

    render(): string {
        return Handlebars.compile(changeAvatarTmpl)(this.props)
    }
}