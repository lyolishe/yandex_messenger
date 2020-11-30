const registerFormTmpl = `
    <formitem data-name="first_name" data-type="text" data-required="true" data-label="First name"></formitem>
    <formitem data-name="second_name" data-type="text" data-required="true" data-label="Last name"></formitem>
    <formitem data-name="login" data-type="text" data-required="true" data-label="Login"></formitem>
    <formitem data-name="email" data-type="email" data-required="true" data-label="Email"></formitem>
    <formitem data-name="phone" data-type="tel" data-label="Phone"></formitem>
    <formitem data-name="password" data-type="password" data-minlength="6" data-label="Password" data-required="true"></formitem>
`;

export default registerFormTmpl;
