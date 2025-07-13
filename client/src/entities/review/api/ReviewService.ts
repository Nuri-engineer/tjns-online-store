import type { AxiosInstance } from 'axios';
import { reviewSchema } from '../model/schema';
import type { NewReviewT, ReviewT } from '../model/types';
import axiosInstance from '../../../shared/api/axiosInstance';

class ReviewService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getReviews(): Promise<ReviewT[]> {
    try {
      const response = await this.client.get('/reviews');
      return reviewSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getReviewById(id: ReviewT['id']): Promise<ReviewT> {
    try {
      const response = await this.client.get(`/reviews/${id.toString()}`);
      return reviewSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createReview(review: NewReviewT): Promise<ReviewT> {
    try {
      const response = await this.client.post('/reviews', review);
      return reviewSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteReview(id: ReviewT['id']): Promise<void> {
    try {
      await this.client.delete(`/reviews/${id.toString()}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllReviewsByProductId(id: ReviewT['productId']): Promise<ReviewT[]> {
    try {
      const response = await this.client.get(`/reviews/product/${id.toString()}`);
      return reviewSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new ReviewService(axiosInstance);
