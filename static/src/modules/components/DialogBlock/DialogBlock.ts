import {MessageBlock} from "../MessageBlock/MessageBlock.js";
import Block, {DefaultBlockProps} from "../../Block.js";

export type DialogBlockProps  = {
    messages: MessageBlock[];
}

export class DialogBlock extends Block<DialogBlockProps> {
    constructor(props: DefaultBlockProps<DialogBlockProps>) {
        super('div', {...props, classList: ["dialog"]})
    }

    componentDidMount() {
        const list = new Block('ul', {classList: ["messageList"]})
        this.props.messages.forEach(message => {
            list.element.appendChild(message.element);
        })
        this.element.append(list.element);
    }

    render(): string {
        return super.render();
    }
}