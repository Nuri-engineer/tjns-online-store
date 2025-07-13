import { createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../api/categoryService';
import type { CategoryT, NewCategoryT } from './categoryType';

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
  const allCategories = await categoryService.getCategories();
  return allCategories;
});

export const getCategory = createAsyncThunk(
  'categories/getCategory',
  async (id: CategoryT['id']) => {
    const oneCategory = await categoryService.getCategory(id);
    return oneCategory;
  },
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (data: NewCategoryT) => {
    const newCategory = await categoryService.createCategory(data);
    return newCategory;
  },
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (data: CategoryT) => {
    const updatedCategory = await categoryService.updateCategory(data);
    return updatedCategory;
  },
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: CategoryT['id']) => {
    await categoryService.deleteCategory(id);
  },
);
