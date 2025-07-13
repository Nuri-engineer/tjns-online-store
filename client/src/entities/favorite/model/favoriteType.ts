import type { z } from 'zod';
import type { deleteFavoriteSchema, favoriteSchema, newFavoriteSchema } from './favoriteSchema';

export type FavoriteT = z.infer<typeof favoriteSchema>;

export type DeleteFavoriteT = z.infer<typeof deleteFavoriteSchema>;

export type NewFavoriteT = z.infer<typeof newFavoriteSchema>;

export type FavoriteSliceT = {
  favorites: FavoriteT[];
  favorite: FavoriteT | null;
  loading: boolean;
};
