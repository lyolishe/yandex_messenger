export interface User {
    firstName: string;
    lastName: string;
    avatarUrl: string;
    isResponder: boolean;
}

export interface ChatItem {
    responder: User;
    lastMessage: {
        text: string;
        time: string;
    }
}

export interface Message {
    user: User
    messageText: string;
    imagesUrl: string[];
}