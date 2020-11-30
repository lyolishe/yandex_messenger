import { HTTPTransport, METHODS } from '../modules/HTTPTransport';
import { ChatDeleteRequest, CreateChatRequest, UsersRequest } from '../types/Contracts';

export default class ChatsApi {
    static getChats = (): Promise<XMLHttpRequest> => HTTPTransport.request('/chats', { method: METHODS.GET })

    static addChat = (data: CreateChatRequest): Promise<XMLHttpRequest> => HTTPTransport.request('/chats', { method: METHODS.POST, data });

    static removeChat = (data: ChatDeleteRequest): Promise<XMLHttpRequest> => HTTPTransport.request('/chats', { method: METHODS.DELETE, data })

    static getChatUsers = (id: number): Promise<XMLHttpRequest> => HTTPTransport.request(`/chats/${id}/users`, { method: METHODS.GET })

    static getNewMessages = (id: number): Promise<XMLHttpRequest> => HTTPTransport.request(`/chats/new/${id}`, { method: METHODS.GET })

    static putChatAvatar = (data: {id: number; avatar: File}): Promise<XMLHttpRequest> => HTTPTransport.request('/chats/avatar', { method: METHODS.PUT, data })

    static addChatUsers = (data: UsersRequest): Promise<XMLHttpRequest> => HTTPTransport.request('/chat/users', { method: METHODS.PUT, data })

    static deleteChatUsers = (data: UsersRequest): Promise<XMLHttpRequest> => HTTPTransport.request('/chat/users', { method: METHODS.DELETE, data })

    static refreshToken = (id: number): Promise<XMLHttpRequest> => HTTPTransport.request(`/chats/token/${id}`, { method: METHODS.POST })
}
