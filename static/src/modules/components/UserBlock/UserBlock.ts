import Block, {DefaultBlockProps} from "../../Block.js";
import {userBlockTmpl} from "./UserBlockTmpl.js";
import {User} from "../../../data/Contracts.js";

export class UserBlock extends Block<User> {
    constructor(props: DefaultBlockProps<User>) {
        super("div", props);
    }

    render(): string {
        const tmpl = userBlockTmpl;
        return Handlebars.compile(tmpl)(this.props)
    }
}