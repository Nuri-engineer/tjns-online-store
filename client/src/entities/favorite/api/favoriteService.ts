import type { AxiosInstance } from 'axios';
import axiosInstance from '../../../shared/api/axiosInstance';
import type { DeleteFavoriteT, FavoriteT, NewFavoriteT } from '../model/favoriteType';
import { favoriteSchema } from '../model/favoriteSchema';

class FavoriteService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getFavorites(userId: number): Promise<FavoriteT[]> {
    try {
      if (!userId || Number.isNaN(Number(userId))) {
        throw new Error('Invalid user ID');
      }

      const allFavorites = await this.client.get(`/favorites/${userId.toString()}`);
      return favoriteSchema.array().parse(allFavorites.data);
    } catch (error) {
      console.error('Ошибка загрузки избранных товаров', error);
      throw error;
    }
  }

  async createFavorite(data: NewFavoriteT): Promise<FavoriteT> {
    try {
      const newFavorite = await this.client.post('/favorites', data);
      return favoriteSchema.parse(newFavorite.data);
    } catch (error) {
      console.error('Ошибка создания избранного товара', error);
      throw error;
    }
  }

  async deleteFavorite({
    userId,
    productId,
  }: {
    userId: number;
    productId: number;
  }): Promise<DeleteFavoriteT> {
    try {
      return await this.client.delete(`/favorites/${userId.toString()}`, { data: { productId } });
    } catch (error) {
      console.error('Ошибка удаления избранного товара', error);
      throw error;
    }
  }
}

export default new FavoriteService(axiosInstance);
