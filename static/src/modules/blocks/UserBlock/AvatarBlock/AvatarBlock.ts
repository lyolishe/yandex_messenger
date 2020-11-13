import Block from "../../../components/Block.js";
import {avatarBlockTmpl} from "./AvatarBlockTmpl.js";

export class AvatarBlock extends Block {
    constructor(avatar?: string) {
        super("div", {classList: ["userAvatar"]}, avatarBlockTmpl(avatar));
    }
}