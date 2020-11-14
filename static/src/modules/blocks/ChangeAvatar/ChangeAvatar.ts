//TODO: Сделать нормальный компонент под смену аватарки

import Block from "../../components/Block.js";
import {UserResponse} from "../../../data/Contracts.js";
import {BasePath, useApi} from "../../Utilits.js";
import {UsersApi} from "../../../api/UsersApi.js";
import {Context} from "../../Context.js";
import {Button} from "../../components/Button/Button.js";

export const changeAvatarTmpl = `
<div class="col mxAuto">
    <div class="avatarFull">
        <img src="{{avatar}}" alt="avatar">
    </div>
    <input type="file" name="avatar" id="avatar">
    <children></children>
</div>
`

export class ChangeAvatar extends Block<UserResponse> {
    constructor(props:UserResponse) {
        super('form', {
            ...props,
            classList: ["row"],
            avatar: props.avatar? BasePath+ props.avatar : "./img/defaultAvatar.png"
        });
        this.element.setAttribute('id', 'changeAvatar')
        this.setProps({
            children: [new Button({
                onClick: this.onClick.bind(this),
                classList: ["btn", "btnPrimary", "mdi", "mdi-folder-upload-outline", "w100", "mt3"],
                type: "submit",
                text: "Change"})]
        })

    }

    onClick(): void {
        const avatar = (this.element as HTMLFormElement).elements[0];
        (avatar as HTMLInputElement).click();
        avatar.addEventListener('change', this.upload.bind(this))
    }

    upload():void {
        const form = new FormData((this.element as HTMLFormElement));
        useApi<UserResponse>(UsersApi.changeAvatar(form)).then(user => {
            new Context().set('user', user);
            this.setProps(user)
        })
    }

    render(): string {
        return Handlebars.compile(changeAvatarTmpl)(this.props)
    }
}