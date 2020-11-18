import Block from "../Block.js";
import {Context} from "../../Context.js";
import {UserService} from "../../../servise/UserService.js";

export class Page extends Block {
    constructor() {
        super('div', {});
        this._checkUser()
    }

    private _checkUser() {
        if (Context.instance.get('user')) {
            return;
        }

        UserService.checkUser()
            .then(user => {
                Context.instance.set('user', user)
            })
    }
}