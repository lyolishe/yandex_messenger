import Block from '../../Block';
import avatarBlockTmpl from './AvatarBlockTmpl';

export default class AvatarBlock extends Block {
    constructor(avatar?: string) {
        super('div', { classList: ['userAvatar'] }, avatarBlockTmpl(avatar));
    }
}
