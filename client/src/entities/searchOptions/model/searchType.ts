import type { z } from 'zod';
import type { searchQuerySchema, searchSchema } from './searchSchema';
import type { productSchema } from '../../products/model/schema';
import type { CategoryT } from '../../category/model/categoryType';

export type SearchT = z.infer<typeof searchSchema>;
export type ProductT = z.infer<typeof productSchema>;
export type SearchQueryT = z.infer<typeof searchQuerySchema>;

export type SearchSliceT = {
  query: string;
  categoryName?: string;
  results: ProductT[];
  loading: boolean;
  error: string | null;
  currentCategory?: CategoryT | null;
};
