import type { z } from 'zod';
import type {
  newProductSchema,
  paginationSchema,
  productSchema,
  productSendSchema,
} from './schema';

export type ProductT = z.infer<typeof productSchema>;
export type PaginationT = z.infer<typeof paginationSchema>;

export type ProductSliceT = {
  products: ProductT[];
  loading: boolean;
  product: ProductT | null;

  productsTodisplay: ProductT[];

  searchProducts: string;

  productsByCategory: ProductT[] | null;
  sortBy: 'price' | 'name' | 'averageRating';
  sortOrder: 1 | -1;
  pagination: PaginationT | null;
  categoryPagination: PaginationT | null;
};

// export type NewProductT = z.infer<typeof newProductSchema>;

export type NewProductT = z.infer<typeof newProductSchema> & {
  files: File[];
};

export type ProductResponceT = {
  products: ProductT[];
  pagination: PaginationT;
};

export type ProductSendT = z.infer<typeof productSendSchema>;
