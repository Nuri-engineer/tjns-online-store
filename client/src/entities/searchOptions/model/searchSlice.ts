import { createSlice } from '@reduxjs/toolkit';
import type { SearchSliceT } from './searchType';
import { searchProducts } from './searchThunks';

const initialState: SearchSliceT = {
  query: '',
  categoryName: '',
  results: [],
  loading: false,
  error: null,
  currentCategory: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearResults: (state) => {
      state.results = [];
      state.error = null;
      state.query = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.query = action.meta.arg;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.error = null;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
        state.results = [];
      });
  },
});

export const { clearResults } = searchSlice.actions;
export default searchSlice.reducer;
