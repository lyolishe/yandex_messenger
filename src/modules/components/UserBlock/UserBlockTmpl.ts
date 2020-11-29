export const userBlockTmpl = `
    <div class="user">
        {{#if avatar}}
        <div class="userAvatar">
            <img src="{{avatar}}"/>
        </div>
        {{else}}
        <div class="userAvatar">
            <img src="./src/img/defaultAvatar.png"/>
        </div>
        {{/if}}
        {{#if display_name}} 
            <h3>{{display_name}}</h3>
        {{else}}
            <h3>{{first_name}} {{second_name}}</h3>
        {{/if}}
        <children></children>
    </div>
`