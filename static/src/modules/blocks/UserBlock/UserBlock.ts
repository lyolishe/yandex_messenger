import Block, {DefaultBlockProps} from "../../components/Block.js";
import {userBlockTmpl} from "./UserBlockTmpl.js";
import {UserResponse} from "../../../data/Contracts.js";

export class UserBlock extends Block<UserResponse> {
    constructor(props: DefaultBlockProps<UserResponse>) {
        super("div", props);
    }

    render(): string {
        return Handlebars.compile(userBlockTmpl)(this.props)
    }
}