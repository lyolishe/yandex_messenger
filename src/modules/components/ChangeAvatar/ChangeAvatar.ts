// TODO: Сделать нормальный компонент под смену аватарки
import * as Handlebars from 'handlebars';
import UsersApi from '../../../api/UsersApi';
import changeAvatarTmpl from './ChangeAvatarTmpl';
import Block from '../Block';
import { UserResponse } from '../../../types/Contracts';
import { BasePath, useApi } from '../../Utilits';
import { Context } from '../../Context';
import { Button } from '../Button/Button';

export default class ChangeAvatar extends Block<UserResponse> {
    constructor(props:UserResponse) {
        super('form', {
            ...props,
            classList: ['row'],
            avatar: props?.avatar ? BasePath + props.avatar : './src/img/defaultAvatar.png',
        });
        this.element.setAttribute('id', 'changeAvatar');
        this.setProps({
            children: [new Button({
                onClick: this.onClick.bind(this),
                classList: ['btn', 'btnPrimary', 'mdi', 'mdi-folder-upload-outline', 'w100', 'mt3'],
                type: 'submit',
                text: 'Change',
            })],
        });
    }

    onClick(): void {
        const [avatar] = (this.element as HTMLFormElement).elements;
        (avatar as HTMLInputElement).click();
        avatar.removeEventListener('change', this.upload.bind(this));
        avatar.addEventListener('change', this.upload.bind(this));
    }

    upload():void {
        const data = new FormData((this.element as HTMLFormElement));
        useApi<UserResponse>(UsersApi.changeAvatar(data)).then((user) => {
            Context.instance.set('user', user);
            this.setProps(user);
        });
    }

    render(): string {
        return Handlebars.compile(changeAvatarTmpl)(this.props);
    }
}
