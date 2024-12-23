const defaultAvatar = require('../../../img/defaultAvatar.png').default;

const chatItemTmpl = `
    {{#if avatar}}
    <div class="userAvatar">
        <img src="{{avatar}}"/>
    </div>
    {{else}}
    <div class="userAvatar">
        <img src="${defaultAvatar}"/>
    </div>
    {{/if}}
    <div class="w50">
        <h5 class="m0">{{title}}</h5>
        <p class="chatLastMessage">
            {{lastMessage.text}}
        </p>
    </div>
    <div>
        <span class="remove">&times;</span>
        {{#if unreadCount}}
        <p class="messageBadge">
            {{unreadCount}}
        </p>
        {{/if}}
    </div>
`;

export default chatItemTmpl;
