export const chatItemTmpl = `
    <div class="chatAvatar">
        <img src="{{responder.avatarUrl}}">
    </div>
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