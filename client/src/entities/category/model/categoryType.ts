import type { z } from 'zod';
import type { categorySchema, newCategorySchema } from './categorySchema';

export type CategoryT = z.infer<typeof categorySchema>;

export type CatSliceT = {
  categories: CategoryT[];
  category: CategoryT | null;
};

export type NewCategoryT = z.infer<typeof newCategorySchema>;
