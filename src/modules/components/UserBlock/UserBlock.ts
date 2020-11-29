import Block, {DefaultBlockProps} from "../Block";
import {userBlockTmpl} from "./UserBlockTmpl";
import {Button} from "../Button/Button";
import {AuthApi} from "../../../api/AuthApi";
import {Router} from "../../Router";
import {BasePath} from "../../Utilits";
import * as Handlebars from 'handlebars'

export type UserBlockProps = {
    first_name?: string | null;
    second_name?: string| null;
    display_name?: string| null;
    avatar?: string | null;
    hasLogout?: boolean;
}

export class UserBlock extends Block<UserBlockProps> {
    constructor(props: DefaultBlockProps<UserBlockProps>) {
        super("div", {...props, avatar: props.avatar? BasePath+props.avatar : "./src/img/defaultAvatar.png"});

        if (props.hasLogout) {
            this.setProps({children: [this._createLogoutButton()]})
        }
    }

    private _logout(): void {
        AuthApi.logout().then(()=> {
            new Router('root').go('/login');
        })
    }

    private _createLogoutButton(): Button {
        return new Button({classList: ["mdi", "mdi-logout", "btn"], text: '', onClick: this._logout, type: "button"})
    }

    render(): string {
        return Handlebars.compile(userBlockTmpl)(this.props)
    }
}