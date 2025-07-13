import { createSlice } from '@reduxjs/toolkit';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from './categoryThunks';

import type { CatSliceT } from './categoryType';


const initialState: CatSliceT = {
  categories: [],
  category: null,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //   getCategories
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (_, action) => {
      console.log(action.error);
    });

    // getOneCategory
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    });
    builder.addCase(getCategory.rejected, (_, action) => {
      console.log(action.error);
    });

    // createCategory
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });
    builder.addCase(createCategory.rejected, (_, action) => {
      console.log(action.error);
    });

    // updateCategory
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const categoryIndex = state.categories.findIndex(
        (category) => category.id === action.payload.id,
      );
      if (categoryIndex !== -1) {
        state.categories[categoryIndex] = action.payload;
      }
      state.categories = state.categories.map((category) =>
        category.id === action.payload.id ? { ...category, ...action.payload } : category,
      );
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      console.error(action.error);
      state.categories = [];
    });

    // deleteCategory
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter((category) => category.id !== action.meta.arg);
    });
    builder.addCase(deleteCategory.rejected, (_, action) => {
      console.error(action.error);
    });
  },
});
