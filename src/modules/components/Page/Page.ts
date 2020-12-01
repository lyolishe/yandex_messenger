import Block from '../Block';
import Context from '../../Context';
import UserService from '../../../servise/UserService';

export default class Page extends Block {
    constructor() {
        super('div', {});
        this._checkUser();
    }

    private _checkUser() {
        if (Context.instance.get('user')) {
            return;
        }

        UserService.checkUser()
            .then((user) => {
                Context.instance.set('user', user);
            });
    }
}
