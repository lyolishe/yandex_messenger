import Block from "../../modules/Block.js";
import {userBlockTmpl} from "./UserBlockTmpl.js";
import {User} from "../../data/Contracts.js";

export type UserBlockProps = User & {classList?: string[]}

export class UserBlock extends Block<UserBlockProps> {
    constructor(props: UserBlockProps) {
        super("div", props);
    }

    render(): string {
        const tmpl = userBlockTmpl;
        return Handlebars.compile(tmpl)(this.props)
    }
}