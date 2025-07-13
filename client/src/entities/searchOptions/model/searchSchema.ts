import { z } from 'zod';
import { productSchema } from '../../products/model/schema';
import { categorySchema } from '../../category/model/categorySchema';

export const searchSchema = z.object({
  success: z.boolean(),
  results: z.array(productSchema),
  category: categorySchema.optional(),
  message: z.string().optional(),
  error: z.string().optional(),
});

export const searchQuerySchema  = z.object({
  categoryName: z.string().min(1, 'Необходимо указать название категории'),
  query: z.string().optional(),
  imit: z.number().optional(),
});
