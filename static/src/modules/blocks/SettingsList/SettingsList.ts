import {SettingProps} from "../../../data/Contracts.js";
import Block, {DefaultBlockProps} from "../../components/Block.js";

export const settingTmpl = `
<div class="settingsIcon mdi {{class}}"></div>
<h4 class="m0">{{point}}</h4>
<div class="mdi mdi-chevron-right"></div>
`;

export const settingsList: SettingProps[] = [
    {active: true, class:"mdi-account-box", point: "Profile"},
    {active: false, class:"mdi-star", point: "Favorite"},
    {active: false, class:"mdi-devices", point: "Devices"},
    {active: false, class:"mdi-security", point: "Privacy"},
    {active: false, class:"mdi-cog-box", point: "Configuration"},
    {active: false, class:"mdi-globe-model", point: "Proxy"},
    {active: false, class:"mdi-frequently-asked-questions", point: "FAQ"},
];
export type SettingsItemProps = SettingProps & {
    onClick?: (e: Event) => void
}
export class SettingItem extends Block<SettingsItemProps> {
    constructor(props: DefaultBlockProps<SettingsItemProps>) {
        super('li', props);

        if (this.props.onClick) {
            this.element.onclick = this.props.onClick
        }
    }

    render(): string {
        if (this.props.active) {
            this.element.classList.add('active');
        } else {
            this.element.classList.remove('active');
        }
        return Handlebars.compile(settingTmpl)(this.props)
    }
}

export class SettingsList extends Block<{}> {
    onClick: (e: Event) => void
    constructor(props?: DefaultBlockProps<{}>) {
        super('ul', {...props,classList: ["settingsList"]}, `<children></children>`);
        this.onClick = ((e: Event) => {
            this.props.children?.forEach((child: SettingItem) => {
                child.setProps({active: false})
            })
            const currentTarget: SettingItem = (this.props.children as SettingItem[]).find((child) => child.element == e.currentTarget)!;
            currentTarget.setProps({active: true});
        }).bind(this)
    }
}