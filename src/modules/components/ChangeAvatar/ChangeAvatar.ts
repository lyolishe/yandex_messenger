//TODO: Сделать нормальный компонент под смену аватарки

import Block from "../Block.js";
import {UserResponse} from "../../../types/Contracts.js";
import {BasePath, useApi} from "../../Utilits.js";
import {UsersApi} from "../../../api/UsersApi.js";
import {Context} from "../../Context.js";
import {Button} from "../Button/Button.js";
import {changeAvatarTmpl} from "./ChangeAvatarTmpl.js";

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
        avatar.removeEventListener('change', this.upload.bind(this))
        avatar.addEventListener('change', this.upload.bind(this))
    }

    upload():void {
        const data = new FormData((this.element as HTMLFormElement));
        useApi<UserResponse>(UsersApi.changeAvatar(data)).then(user => {
            Context.instance.set('user', user);
            this.setProps(user)
        })
    }

    render(): string {
        return Handlebars.compile(changeAvatarTmpl)(this.props)
    }
}