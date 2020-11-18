import Block from "../../modules/components/Block.js";
import {useApi} from "../../modules/Utilits.js";
import {ChatsResponse, UserResponse} from "../../types/Contracts.js";
import {UserBlock} from "../../modules/components/UserBlock/UserBlock.js";
import {NavTabsBlock} from "../../modules/components/NavTabs/NavTabsBlock.js";
import {ChatListBlock} from "../../modules/components/ChatListBlock/ChatList.js";
import {ChatItemBlock} from "../../modules/components/ChatItemBlock/ChatItemBlock.js";
import {BlankDialogBlock} from "../../modules/components/BlankDialogBlock/BlankDialogBlock.js";
import {ChatsApi} from "../../api/ChatsApi.js";
import {Context} from "../../modules/Context.js";
import {AuthApi} from "../../api/AuthApi.js";


export class DialogPage extends Block{
    menuItemId: string
    sidebar: Block;
    main: Block;
    chats: ChatListBlock;
    constructor() {
        super('div', {})
        this.sidebar = new Block('aside', {classList: ["appSideBar"]})
        this.main = new Block('main', {})
        this.chats = new ChatListBlock({onDialogPick: this.onPickDialog.bind(this)});
    }

    onPickDialog (chatId: string): void {
        this.menuItemId = chatId
        this.createChat()
    }

    setChats():void {
        this._getChats().then(chats => {
            const chatItems = chats.length?
                chats.map(chat => new ChatItemBlock({onClick: this.chats.onClick, setChats: this.setChats.bind(this), ...chat})) :
                [new Block('li', {}, 'No chats yet')];

            this.chats.setProps({...this.chats.props, children: chatItems})
        })
    }

    private _getChats(): Promise<ChatsResponse[]> {
        return useApi<ChatsResponse[]>(ChatsApi.getChats())
    }

    componentDidMount() {
        useApi<UserResponse>(AuthApi.get()).then(user => {
            Context.instance.set('user', user)
            return [new UserBlock({...user, hasLogout: true}), new NavTabsBlock()]
        }).then(([user, navTab]) => {
            this.setChats()
            this.sidebar.setProps({children: [user, navTab, this.chats]})

            const dialogBlock = new BlankDialogBlock(this.setChats.bind(this))
            const app = new Block('div', {classList: ["appMain"], children: [dialogBlock]});
            const appWrapper = new Block('div', {classList: ["appWrapper"], children: [app]})
            this.main.setProps({...this.main.props, children: [appWrapper]});
            this.setProps({...this.props, children: [this.sidebar, this.main]})
        })
    }

    show() {
        super.show();
        this.componentDidMount()
    }


    //@TODO: Сделат метод для отображения чатиков
    createChat() {

    }
}