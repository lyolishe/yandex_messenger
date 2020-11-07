export const messageBlockTmpl = `
    {{#if this.messageContent}}
        <div class="messageContent">
            {{this.messageContent}}
        </div>
    {{/if}}
    {{#if messageImages}}
        <div class="messageImage">
            {{#each messageImages}}
                <img src="{{this.url}}"/>
            {{/each}}
        </div>
    {{/if}}
`;
//# sourceMappingURL=MessageBlockTmpl.js.map