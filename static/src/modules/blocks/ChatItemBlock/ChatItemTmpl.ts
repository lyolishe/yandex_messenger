export const chatItemTmpl = `
    {{#if avatar}}
    <div class="userAvatar">
        <img src="{{avatar}}"/>
    </div>
    {{else}}
    <div class="userAvatar">
        <img src="./img/defaultAvatar.png"/>
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
`