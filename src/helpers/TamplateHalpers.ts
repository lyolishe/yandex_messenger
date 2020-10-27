export function isUserMessage (user) {
    return !user.isResponder ? "chatItem" : "chatItemResponse"
}
export function isActive (flag) {
    return flag? "active" : "";
}