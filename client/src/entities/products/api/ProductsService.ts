import type { AxiosInstance } from 'axios';
import type { PaginationT, ProductResponceT, ProductT } from '../model/types';
import { paginationSchema, productSchema } from '../model/schema';
import axiosInstance from '../../../shared/api/axiosInstance';

class ProductsService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getProducts(
    page = 1,
    limit = 10,
  ): Promise<ProductResponceT> {
    try {
      const response = await this.client.get('/products', { params: { page, limit } });

      return {
        products: productSchema.array().parse(response.data.products),
        pagination: paginationSchema.parse(response.data.pagination),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getOneProduct(id: number): Promise<ProductT> {
    try {
      const response = await this.client.get(`/products/${id.toString()}`);
      return productSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProductsById(id: number, page = 1, limit = 10): Promise<ProductResponceT> {
    try {
      const response = await this.client.get(`/products/category/${id.toString()}`, { params: { page, limit } });

      return {
        products: productSchema.array().parse(response.data.products),
        pagination: paginationSchema.parse(response.data.pagination),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      await this.client.delete(`/products/${id.toString()}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(product: any): Promise<ProductT> {
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', String(product.price));
      formData.append('categoryId', String(product.categoryId));
      formData.append('brand', product.brand);
      formData.append('stock', String(product.stock));

      for (const file of product.files) {
        formData.append('images', file); // ключ должен совпадать с multer
      }

      const response = await this.client.post('/products', formData);

      return productSchema.parse(response.data);
    } catch (error) {
      console.error('Ошибка при отправке продукта:', error);
      throw error;
    }
  }

  async update(product: any): Promise<ProductT> {
    try {
      const { id } = product;
      const formData = new FormData();

      // Добавление текстовых полей
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', String(product.price));
      formData.append('categoryId', String(product.categoryId));
      formData.append('brand', product.brand);
      formData.append('stock', String(product.stock));

      // Добавляем новые изображения, если есть
      if (product.files && product.files.length > 0) {
        for (const file of product.files) {
          formData.append('images', file);
        }
      }

      // Добавляем старые изображения (оставшиеся после удаления), всегда
      if (product.oldImages && product.oldImages.length > 0) {
        for (const img of product.oldImages) {
          formData.append('oldImages', img);
        }
      }

      const response = await this.client.put(`/products/${id}`, formData);

      return productSchema.parse(response.data);
    } catch (error) {
      console.error('Ошибка при обновлении продукта:', error);
      throw error;
    }
  }
}

export default new ProductsService(axiosInstance);
