import Block from "../../Block.js";
export const settingTmpl = `
<div class="settingsIcon mdi {{class}}"></div>
<h4 class="m0">{{point}}</h4>
<div class="mdi mdi-chevron-right"></div>
`;
export const settingsList = [
    { active: true, class: "mdi-account-box", point: "Profile" },
    { active: false, class: "mdi-star", point: "Favorite" },
    { active: false, class: "mdi-devices", point: "Devices" },
    { active: false, class: "mdi-security", point: "Privacy" },
    { active: false, class: "mdi-cog-box", point: "Configuration" },
    { active: false, class: "mdi-globe-model", point: "Proxy" },
    { active: false, class: "mdi-frequently-asked-questions", point: "FAQ" },
];
export class SettingItem extends Block {
    constructor(props) {
        var _a;
        super('li', props);
        if (this.props.active) {
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.classList.add('active');
        }
    }
    render() {
        return Handlebars.compile(settingTmpl)(this.props);
    }
}
export class SettingsList extends Block {
    constructor(props) {
        super('ul', Object.assign(Object.assign({}, props), { classList: ["settingsList"] }));
        this.onClick = function onClick(e) {
            this.children.forEach((elem) => {
                var _a;
                (_a = elem.element) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
        }.bind(this);
    }
}
//# sourceMappingURL=SettingsList.js.map