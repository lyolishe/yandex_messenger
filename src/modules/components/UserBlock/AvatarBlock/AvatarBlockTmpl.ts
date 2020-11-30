const avatarBlockTmpl = (avatar?: string): string => `<img stc='${avatar ?? './img/defaultAvatar.png'}'/>`;
export default avatarBlockTmpl;
