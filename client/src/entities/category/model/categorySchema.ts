import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const newCategorySchema = z.object({
  name: z.string(),
});
