export const chatItemTmpl = `
    <div class="chatAvatar">
        <img src="{{responder.avatarUrl}}">
    </div>
    <div class="w50">
        <h5 class="m0">{{responder.firstName}} {{responder.lastName}}</h5>
        <p class="chatLastMessage">
            {{lastMessage.text}}
        </p>
    </div>
    <div>
        {{#if unreadCount}}
        <p class="messageBadge">
            {{unreadCount}}
        </p>
        {{/if}}
        <span class="time">
            {{lastMessage.time}}
        </span>
    </div>
`;
//# sourceMappingURL=ChatItemTmpl.js.map