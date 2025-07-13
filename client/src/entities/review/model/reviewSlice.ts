import { createSlice } from '@reduxjs/toolkit';
import type { ReviewSliceT } from './types';
import {
  createReview,
  deleteReview,
  getReviewById,
  getReviews,
  getReviewsByProductId,
} from './reviewThunk';

const initialState: ReviewSliceT = {
  reviews: [],
  loading: false,
  review: null,
  reviewsByProduct: [],
  stateReview: false,
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    // будет приходить id user, нужно проверить в комментах есть ли его комментарий
    setStateReview: (state, action) => {
      // Проверяем есть ли у пользователя отзыв на текущий товар
      const hasReview = state.reviewsByProduct.some((review) => review.userId === action.payload);
      state.stateReview = !hasReview; // true - можно оставить отзыв, false - уже есть отзыв
    },
  },
  extraReducers: (builder) => {
    // Все продукты
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    });
    builder.addCase(getReviews.rejected, (state, action) => {
      state.loading = false;
      state.reviews = [];
      console.error(action.error);
    });
    builder.addCase(getReviews.pending, (state) => {
      state.loading = true;
    });

    // Продукт по id
    builder.addCase(getReviewById.fulfilled, (state, action) => {
      state.loading = false;
      state.review = action.payload;
    });
    builder.addCase(getReviewById.rejected, (state, action) => {
      state.loading = false;
      state.review = null;
      console.error(action.error);
    });
    builder.addCase(getReviewById.pending, (state) => {
      state.loading = true;
      state.review = null;
    });

    // по id продукта
    builder.addCase(getReviewsByProductId.fulfilled, (state, action) => {
      state.loading = false;
      state.reviewsByProduct = action.payload;
    });
    builder.addCase(getReviewsByProductId.rejected, (state, action) => {
      state.loading = false;
      state.reviewsByProduct = [];
      console.error(action.error);
    });
    builder.addCase(getReviewsByProductId.pending, (state) => {
      state.loading = true;
      state.reviewsByProduct = [];
    });

    // добавление
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.loading = false;
      state.stateReview = false;
      state.reviews.push(action.payload);
    });
    builder.addCase(createReview.rejected, (state, action) => {
      state.loading = false;
      console.error(action.error);
    });
    builder.addCase(createReview.pending, (state) => {
      state.loading = true;
    });

    // удаление
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = state.reviews.filter((review) => review.id !== action.payload);
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.loading = false;
      console.error(action.error);
    });
    builder.addCase(deleteReview.pending, (state) => {
      state.loading = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setStateReview } = reviewSlice.actions;

export default reviewSlice.reducer;
