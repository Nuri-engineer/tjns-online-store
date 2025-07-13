import type { AxiosInstance } from 'axios';
import axiosInstance from '../../../shared/api/axiosInstance';
import type { ChatT, MessageT, NewChatT, NewMessageT } from '../model/chatTypes';
import { chatSchema, messageSchema } from '../model/chatSchema';

class ChatService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getAllChats(): Promise<ChatT[]> {
    try {
      const response = await this.client.get('/chats/all');
      return chatSchema.array().parse(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке всех чатов', error);
      throw error;
    }
  }

  async findOrCreateChatByUserId(data: NewChatT): Promise<ChatT> {
    try {
      const response = await this.client.post('/chats', data);
      return chatSchema.parse(response.data)
    } catch (error) {
      console.error('Ошибка при поиске или создании чата', error)
      throw error
    }
  }

  async mergeGuestChatWithUser(data: NewChatT): Promise<ChatT> {
    try {
      const response = await this.client.post('/chats/merge', data);
      return chatSchema.parse(response.data)
    } catch (error) {
      console.error('Ошибка при слиянии id чата', error);
      throw error
    }
  }

  async getAllMessagesByChat(chatId: number): Promise<MessageT[]> {
    try {
      const response = await this.client.get(`/messages/${String(chatId)}/all`);
      return messageSchema.array().parse(response.data);
    } catch (error) {
      console.error('Ошибка при получении всех сообщений чата', error);
      throw error
    }
  }

  async createMessage(data: NewMessageT): Promise<MessageT>{
    try {
      const { chatId } = data
      const response = await this.client.post(`/messages/${String(chatId)}`, data);
      return messageSchema.parse(response.data);
    } catch (error) {
      console.error('Ошибка при создании сообщений', error);
      throw error
    }
  }
}

export default new ChatService(axiosInstance);
