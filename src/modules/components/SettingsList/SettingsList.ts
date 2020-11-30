import Block, { DefaultBlockProps } from '../Block';
import SettingItem from './SettingsItem';
import { SettingProps } from '../../../types/Contracts';

export const settingsList: SettingProps[] = [
    { active: true, class: 'mdi-account-box', point: 'Profile' },
    { active: false, class: 'mdi-star', point: 'Favorite' },
    { active: false, class: 'mdi-devices', point: 'Devices' },
    { active: false, class: 'mdi-security', point: 'Privacy' },
    { active: false, class: 'mdi-cog-box', point: 'Configuration' },
    { active: false, class: 'mdi-globe-model', point: 'Proxy' },
    { active: false, class: 'mdi-frequently-asked-questions', point: 'FAQ' },
];

export class SettingsList extends Block<{ onPick?: (id: string)=> void }> {
    onClick: (e: Event) => void

    constructor(props?: DefaultBlockProps<{ onPick: (id: string)=> void }>) {
        super('ul', { ...props, classList: ['settingsList'] }, '<children></children>');
        this.onClick = (e: Event) => {
            this.props.children?.forEach((child: SettingItem) => {
                child.setProps({ active: false });
            });
            const currentTarget: SettingItem = (this.props.children as SettingItem[]).find(
                (child) => child.element === e.currentTarget,
            )!;
            currentTarget.setProps({ active: true });
            props?.onPick(currentTarget.props.point!);
        };
    }
}
