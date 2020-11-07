//TODO: Сделать нормальный компонент под смену аватарки
import Block from "../../Block.js";
export const changeAvatarTmpl = `
<div class="col mxAuto"
    <div class="avatarFull">
        <img src="{{avatarUrl}}" alt="avatar">
    </div>
    <button class="btn btnPrimary mdi mdi-folder-upload-outline w100 mt3"> Change</button>
</div>
`;
export class ChangeAvatar extends Block {
    constructor(props) {
        super('div', Object.assign(Object.assign({}, props), { classList: ["row"], avatarUrl: "../img/Group%20216.png" }));
    }
    render() {
        return Handlebars.compile(changeAvatarTmpl)(this.props);
    }
}
//# sourceMappingURL=ChangeAvatar.js.map