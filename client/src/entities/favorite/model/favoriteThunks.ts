import { createAsyncThunk } from '@reduxjs/toolkit';
import FavoriteService from '../api/favoriteService';
import type { NewFavoriteT } from './favoriteType';
import { serializeAxiosError } from '../utils/serializeAxiosError';

export const getFavorites = createAsyncThunk('favorite/getFavorites', async (userId: number) => {
  const allFavorites = await FavoriteService.getFavorites(userId);
  return allFavorites;
});

export const createFavorite = createAsyncThunk(
  'favorite/createFavorite',
  async (data: NewFavoriteT) => {
    const newFavorite = await FavoriteService.createFavorite(data);
    return newFavorite;
  },
);

export const deleteFavorite = createAsyncThunk(
  'favorite/deleteFavorite',
  async ({ userId, productId }: { userId: number; productId: number }, { rejectWithValue }) => {
    try {
      await FavoriteService.deleteFavorite({ userId, productId });
      return { productId }; // Возвращаем только необходимые данные
    } catch (error) {
      return rejectWithValue(serializeAxiosError(error));
    }
  },
);
