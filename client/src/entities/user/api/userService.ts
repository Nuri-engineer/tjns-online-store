import type { AxiosInstance } from 'axios';
import type { UserFormT, UserLoginFormT, UserT } from '../model/types';
import { adminSchema, authResponseSchema, userSchema } from '../model/schema';
import axiosInstance from '../../../shared/api/axiosInstance';

class UserService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async sigupAdmin(data: UserFormT): Promise<void> {
    try {
      await this.client.post('/auth/signupAdmin', data);
    } catch (error) {
      console.error('Ошибка регистрации', error);
      throw error;
    }
  }

  async getUsers(): Promise<UserT[]> {
    try {
      const response = await this.client.get('/auth/getUsers');
      return userSchema.array().parse(response.data);
    } catch (error) {
      console.error('Ошибка получения пользователей', error);
      throw error;
    }
  }

  async getAdmin(): Promise<UserT[]> {
    try {
      const response = await this.client.get('/auth/getAdmin');
      return userSchema.array().parse(response.data);
    } catch (error) {
      console.error('Ошибка при получении администратора', error);
      throw error;
    }
  }

  async signupUser(data: UserFormT): Promise<UserT> {
    try {
      const response = await this.client.post('/auth/signup', data);
      return authResponseSchema.parse(response.data).user;
    } catch (error) {
      console.error('Ошибка регистрации', error);
      throw error;
    }
  }

  async loginUser(data: UserLoginFormT): Promise<UserT> {
    try {
      const response = await this.client.post('/auth/login', data);
      return authResponseSchema.parse(response.data).user;
    } catch (error) {
      console.error('Ошибка входа', error);
      throw error;
    }
  }

  async refreshUser(): Promise<UserT> {
    try {
      const response = await this.client.get('/token/refresh');
      return authResponseSchema.parse(response.data).user;
    } catch (error) {
      console.error('Ошибка обновления', error);
      throw error;
    }
  }

  async logoutUser(): Promise<void> {
    try {
      await this.client.get('/auth/logout');
    } catch (error) {
      console.error('Ошибка выхода', error);
      throw error;
    }
  }
}

export default new UserService(axiosInstance);
