export const changePasswordTmpl = `
<formitem data-name="password" data-type="password" data-required="true" data-minlength="6" data-label="Password" ></formitem> 
<formitem data-name="newPassword" data-type="password" data-required="true" data-minlength="6" data-label="New password" ></formitem>
<div class="formItem pr0"></div>
`;
export const profileSettingsTmpl = `
<form id="profileSettings" onsubmit="return logFieldValues(event)">

<!--TODO: написать разделение name на firstName и lastName!-->
<!--Сюда будут js-ом отделяться фамилия от поля сверху! сделано для экономии места (и чтобы не пугать пользака)-->
<input type="text" class="dNone" id="firstName" name="firstName">
<input type="text" class="dNone" id="lastName" name="lastName"/>
<!---->

<formitem data-name="displayName" data-type="text" data-label="Display name" ></formitem>
<formitem data-name="email" data-type="email" data-label="Email" ></formitem>
<formitem data-name="login" data-type="text" data-label="Login" ></formitem>
<formitem data-name="phone" data-type="tel" data-label="Phone" ></formitem>
<div class="formItem pr0 pt0"></div>
`;
//# sourceMappingURL=ProfileFormTmpl.js.map