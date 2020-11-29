import {HTTPTransport, METHODS} from "../modules/HTTPTransport";
import {ChatDeleteRequest, CreateChatRequest, UsersRequest} from "../types/Contracts";

export class ChatsApi {
    static getChats = () => {
        return HTTPTransport.request('/chats', {method: METHODS.GET})
    }

    static addChat = (data: CreateChatRequest) => {
        return HTTPTransport.request('/chats', {method: METHODS.POST, data}
        );
    }

    static removeChat = (data: ChatDeleteRequest) => {
        return HTTPTransport.request('/chats', {method: METHODS.DELETE, data})
    }

    static getChatUsers = (id: number) => {
        return HTTPTransport.request(`/chats/${id}/users`, {method: METHODS.GET})
    }

    static getNewMessages = (id: number) => {
        return HTTPTransport.request(`/chats/new/${id}`, {method: METHODS.GET})
    }

    static putChatAvatar = (data: {id: number; avatar: File}) => {
        return HTTPTransport.request('/chats/avatar', {method: METHODS.PUT, data})
    }

    static addChatUsers = (data: UsersRequest) => {
        return HTTPTransport.request('/chat/users', {method: METHODS.PUT, data})

    }

    static deleteChatUsers = (data: UsersRequest) => {
        return HTTPTransport.request('/chat/users', {method: METHODS.DELETE, data})
    }

    static refreshToken = (id: number) => {
        return HTTPTransport.request(`/chats/token/${id}`, {method: METHODS.POST})
    }
}