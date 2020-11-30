import * as Handlebars from 'handlebars';
import settingTmpl from './SettingsTmpl';
import { SettingProps } from '../../../types/Contracts';
import Block, { DefaultBlockProps } from '../Block';

export type SettingsItemProps = SettingProps & {
    onClick?: (e: Event) => void
}

export default class SettingItem extends Block<SettingsItemProps> {
    constructor(props: DefaultBlockProps<SettingsItemProps>) {
        super('li', props);

        if (this.props.onClick) {
            this.element.onclick = this.props.onClick;
        }
    }

    render(): string {
        if (this.props.active) {
            this.element.classList.add('active');
        } else {
            this.element.classList.remove('active');
        }
        return Handlebars.compile(settingTmpl)(this.props);
    }
}
