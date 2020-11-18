export const avatarBlockTmpl = (avatar?: string): string => {
    return `<img stc="${avatar?? "./img/defaultAvatar.png"}"/>`
}