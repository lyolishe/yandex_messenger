export const formItemTmpl = `
    <label for="{{name}}" class="formLabel">
        {{label}}
    </label>
    <input id="{{name}}"
    {{#if placeholder}} placeholder="{{placeholder}}" {{/if}}
    {{#if type}} type="{{type}}" {{/if}}
    {{#if name}} name="{{name}}" {{/if}}
    class="formControl loginInput" 
    {{#if maxlength}} maxLength="{{maxlength}}" {{/if}}
    {{#if minlength}} minLength="{{minlength}}" {{/if}}
    {{#if pattern}} pattern="{{pattern}}" {{/if}}
    {{#if required}} required {{/if}}
    {{#if initialValue}} value=initialValue {{/if}} />
    
`