import { createAsyncThunk } from '@reduxjs/toolkit';
import ReviewService from '../api/ReviewService';
import type { NewReviewT, ReviewT } from './types';

export const getReviews = createAsyncThunk('review/getReviews', async () =>
  ReviewService.getReviews(),
);

export const getReviewById = createAsyncThunk('review/getReviewById', async (id: ReviewT['id']) =>
  ReviewService.getReviewById(id),
);

export const createReview = createAsyncThunk('review/createReview', (review: NewReviewT) =>
  ReviewService.createReview(review),
);

export const deleteReview = createAsyncThunk('review/deleteReview', async (id: ReviewT['id']) =>
  ReviewService.deleteReview(id),
);

export const getReviewsByProductId = createAsyncThunk(
  'review/getReviewsByProductId',
  async (id: ReviewT['productId']) => ReviewService.getAllReviewsByProductId(id),
);
