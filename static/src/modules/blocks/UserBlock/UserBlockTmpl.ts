export const userBlockTmpl = `
    <div class="user">
        {{#if avatar}}
        <div class="userAvatar">
            <img src="{{avatar}}"/>
        </div>
        {{else}}
        <div class="userAvatar">
            <img src="./img/defaultAvatar.png"/>
        </div>
        {{/if}}
        <h3>{{first_name}} {{second_name}}</h3>
        <children></children>
    </div>
`