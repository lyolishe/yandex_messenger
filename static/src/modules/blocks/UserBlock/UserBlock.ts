import Block, {DefaultBlockProps} from "../../components/Block.js";
import {userBlockTmpl} from "./UserBlockTmpl.js";
import {UserResponse} from "../../../data/Contracts.js";
import {Button} from "../../components/Button/Button.js";
import {AuthApi} from "../../../api/AuthApi.js";
import {Router} from "../../Router.js";
import {BasePath} from "../../Utilits.js";

export class UserBlock extends Block<UserResponse> {
    constructor(props: DefaultBlockProps<UserResponse>, hasLogout?: boolean) {
        super("div", {...props, avatar: props.avatar? BasePath+props.avatar : "./img/defaultAvatar.png"});

        if (hasLogout) {
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