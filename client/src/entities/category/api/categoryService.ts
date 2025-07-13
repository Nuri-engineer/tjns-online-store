import type { AxiosInstance } from 'axios';
import axiosInstance from '../../../shared/api/axiosInstance';
import type { CategoryT, NewCategoryT } from '../model/categoryType';
import { categorySchema, newCategorySchema } from '../model/categorySchema';

class CategoryService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getCategories(): Promise<CategoryT[]> {
    try {
      const allCategories = await this.client.get('/categories');
      return categorySchema.array().parse(allCategories.data);
    } catch (error) {
      console.error('Ошибка при получении категорий', error);
      throw error;
    }
  }

  async getCategory(id: number): Promise<CategoryT> {
    try {
      const category = await this.client.get(`/categories/${id.toString()}`);
      return categorySchema.parse(category.data);
    } catch (error) {
      console.error('Ошибка при получении категории', error);
      throw error;
    }
  }

  async createCategory(data: NewCategoryT): Promise<CategoryT> {
    try {
      const newCategory = await this.client.post('/categories', data);
      return categorySchema.parse(newCategory.data);
    } catch (error) {
      console.error('Ошибка при создании категории', error);
      throw error;
    }
  }

  async updateCategory(data: CategoryT): Promise<CategoryT> {
    try {
      const { id } = data;
      newCategorySchema.parse(data);
      const updatedCategory = await this.client.put(`/categories/${id.toString()}`, data);
      return categorySchema.parse(updatedCategory.data);
    } catch (error) {
      console.error('Ошибка при обновлении категории', error);
      throw error;
    }
  }

  async deleteCategory(id: CategoryT['id']): Promise<void> {
    try {
      await this.client.delete(`/categories/${id.toString()}`);
    } catch (error) {
      console.error('Ошибка при удалении категории', error);
      throw error;
    }
  }
}

export default new CategoryService(axiosInstance);
