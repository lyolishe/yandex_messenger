export const changePasswordTmpl = `
<formitem data-name="oldPassword" data-type="password" data-required="true" data-minlength="6" data-label="Old password" ></formitem> 
<formitem data-name="newPassword" data-type="password" data-required="true" data-minlength="6" data-label="New password" ></formitem>
<div class="formItem pr0"></div>
`;

export const profileSettingsTmpl = `
<formitem data-type="text" data-name="first_name" data-label="First name" data-required="true"></formitem>
<formitem data-type="text" data-name="second_name" data-label="Last name" data-required="true"></formitem>
<formitem data-name="display_name" data-type="text" data-label="Display name" data-required="true"></formitem>
<formitem data-name="email" data-type="email" data-label="Email" data-required="true"></formitem>
<formitem data-name="login" data-type="text" data-label="Login" data-required="true"></formitem>
<formitem data-name="phone" data-type="tel" data-label="Phone" data-required="true"></formitem>
`;
