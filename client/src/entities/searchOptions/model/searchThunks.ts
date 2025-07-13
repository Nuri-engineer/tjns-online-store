import { createAsyncThunk } from '@reduxjs/toolkit';
import SearchService from '../api/SearchService';
import type { SearchT } from './searchType';
// import debounce from 'lodash.debounce';

export const searchProducts = createAsyncThunk<SearchT, string, { rejectValue: string }>(
  'search/searchProducts',
  async (query, { rejectWithValue }) => {
    try {
      const data = await SearchService.getSearchResults(query);

      if (!data.success) {
        return rejectWithValue(data.error ?? data.message ?? 'Не удалось выполнить поиск');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
  },
);
