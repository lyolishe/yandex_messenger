export const registerFormTmpl = `
    <formitem data-name="name" data-type="text" data-required="true" data-label="Full name" data-placeholder="John Bone" ></formitem>
    <!--TODO: написать разделение name на firstName и lastName!-->
    <!--Сюда будут js-ом отделяться фамилия от поля сверху! сделано для экономии места и чтобы (не пугать пользака)-->
    <input type="text" class="dNone" name="firstName">
    <input type="text" class="dNone" name="lastName"/>
    <!---->
    <formitem data-name="login" data-type="text" data-required="true" data-label="Login" ></formitem>
    <formitem data-name="email" data-type="email" data-required="true" data-label="Email" ></formitem>
    <formitem data-name="phone" data-type="tel" data-label="Phone" ></formitem>
    <formitem data-name="password" data-type="password" data-minlength="6" data-label="Password" data-required="true" ></formitem>
`;