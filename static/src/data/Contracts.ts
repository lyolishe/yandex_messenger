export type User = {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    isResponder?: boolean;
}

export type ChatItem = {
    responder?: User;
    lastMessage?: {
        text?: string;
        time?: string;
    },
    unreadCount?: number;
    isActive: boolean;
}

export type Message = {
    isResponder?: boolean;
    messageText?: string;
    imagesUrl?: string[];
}

export type SettingProps = {
    active?: boolean;
    point?: string;
    class?: string;
}