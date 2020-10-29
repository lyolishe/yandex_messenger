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
}

export type Message = {
    isResponder?: boolean;
    messageText?: string;
    imagesUrl?: string[];
}