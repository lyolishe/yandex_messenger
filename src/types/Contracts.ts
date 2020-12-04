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

export type SingUpRequest = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export type SignInRequest = {
    login: string;
    password: string;
}

export interface CreateChatRequest {
    title: string;
}

export interface UsersRequest {
    users?: number[] | null;
    chatId?: number | null;
}

export interface ChatsResponse {
    id?: number | null;
    title?: string | null;
    avatar?: string | null;
}

export interface ChatDeleteRequest {
    chatId: number;
}

export interface ChatDeleteResponse {
    userId?: number | null;
    result?: ChatsResponse | null;
}

export interface ChatMessagesTokenResponse {
    token?: string | null;
}

export interface UnreadCountResponse {
    unread_count?: string | null;
}

export interface OauthSingInRequest {
    code: string;
}

export interface ServiceId {
    service_id?: string | null;
}

export interface BadRequestError {
    message?: string | null;
    body: {
        description?: string | null;
    }
}

export interface UserIdResponse {
    id?: number | null;
    first_name?: string | null;
    second_name?: string | null;
    display_name?: string | null;
    login?: string | null;
    email?: string | null;
    phone?: string | null;
    avatar?: string | null;
}

export interface UserUpdateRequest {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface UserRequest {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
}

export interface FindUserRequest {
    login: string;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export type UserResponse = {
    id?: number | null;
    first_name?: string | null;
    second_name?: string | null;
    display_name?: string | null;
    login?: string | null;
    email?: string | null;
    phone?: string | null;
    avatar?: string | null;
}

export interface ChatUserResponse {
    id?: number | null;
    first_name?: string | null;
    second_name?: string | null;
    display_name?: string | null;
    login?: string | null;
    email?: string | null;
    phone?: string | null;
    avatar?: string | null;
    role?: UserRole | null;
}

export type UserRole = 'admin' | 'regular';
