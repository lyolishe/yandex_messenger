const changeAvatarTmpl = `
    <div class="col mxAuto">
        <div class="avatarFull">
            <img src="{{avatar}}" alt="avatar">
        </div>
        <input type="file" name="avatar" id="avatar" style="display: none">
        <children></children>
    </div>
`;

export default changeAvatarTmpl;
