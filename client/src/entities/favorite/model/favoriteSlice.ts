import { createSlice } from '@reduxjs/toolkit';
import type { FavoriteSliceT } from './favoriteType';
import { createFavorite, deleteFavorite, getFavorites } from './favoriteThunks';

const initialState: FavoriteSliceT = {
  favorites: [],
  favorite: null,
  loading: false,
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // getAllFavorites
    builder.addCase(getFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.loading = false;
    });
    builder.addCase(getFavorites.rejected, (state, action) => {
      console.error(action.error);
      state.loading = false;
    });
    builder.addCase(getFavorites.pending, (state) => {
      state.loading = true;
    });

    // createFavorite
    builder.addCase(createFavorite.fulfilled, (state, action) => {
      state.favorites.push(action.payload);
    });
    builder.addCase(createFavorite.rejected, (_, action) => {
      console.error(action.error);
    });

    // deleteFavorite
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.productId !== action.payload.productId,
      );
    });
    builder.addCase(deleteFavorite.rejected, (_, action) => {
      console.error(action.error);
    });
  },
});

export default favoriteSlice.reducer;
