import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  price: z.number(),
  brand: z.string(),
  stock: z.number(),
  categoryId: z.number(),
  averageRating: z.number().optional(),
});

export const newProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  price: z.number(),
  brand: z.string(),
  stock: z.number(),
  categoryId: z.number(),
});

export const paginationSchema = z.object({
  totalItems: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  itemsPerPage: z.number(),
});

export const productSendSchema = z.object({
  page: z.number(),
  limit: z.number(),
});
