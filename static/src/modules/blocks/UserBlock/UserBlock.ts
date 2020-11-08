import Block, {DefaultBlockProps} from "../../components/Block.js";
import {userBlockTmpl} from "./UserBlockTmpl.js";
import {User} from "../../../data/Contracts.js";

export class UserBlock extends Block<User> {
    constructor(props: DefaultBlockProps<User>) {
        super("div", props);
    }

    render(): string {
        return Handlebars.compile(userBlockTmpl)(this.props)
    }
}