
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

export interface SingUpRequest {
    first_name?: string | null;
    second_name?: string | null;
    login?: string | null;
    email?: string | null;
    password?: string | null;
    phone?: string | null;
}

export interface SignInRequest {
    login?: string | null;
    password?: string | null;
}

export interface CreateChatRequest {
    title?: string | null;
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
    chatId?: number | null;
}

export  interface ChatDeleteResponse {
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
    code?: string | null;
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
    first_name?: string | null;
    second_name?: string | null;
    display_name?: string | null;
    login?: string | null;
    email?: string | null;
    phone?: string | null;
}

export interface UserRequest {
    first_name?: string | null;
    second_name?: string | null;
    display_name?: string | null;
    login?: string | null;
    email?: string | null;
}

export interface FindUserRequest {
    login?: string | null;
}

export interface ChangePasswordRequest {
    oldPassword?: string | null;
    newPassword?: string | null;
}

export interface UserResponse {
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

export type UserRole = "admin" | "regular";