import Block, {DefaultBlockProps} from "../Block.js";
import {userBlockTmpl} from "./UserBlockTmpl.js";
import {Button} from "../Button/Button.js";
import {AuthApi} from "../../../api/AuthApi.js";
import {Router} from "../../Router.js";
import {BasePath} from "../../Utilits.js";

export type UserBlockProps = {
    first_name?: string | null;
    second_name?: string| null;
    display_name?: string| null;
    avatar?: string | null;
    hasLogout?: boolean;
}

export class UserBlock extends Block<UserBlockProps> {
    constructor(props: DefaultBlockProps<UserBlockProps>) {
        super("div", {...props, avatar: props.avatar? BasePath+props.avatar : "./img/defaultAvatar.png"});

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