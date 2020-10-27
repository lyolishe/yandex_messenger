import {User} from "../data/Contracts";

export function isUserMessage (user:User): string {
    return !user.isResponder ? "chatItem" : "chatItemResponse"
}
export function isActive (flag: boolean):string {
    return flag? "active" : "";
}