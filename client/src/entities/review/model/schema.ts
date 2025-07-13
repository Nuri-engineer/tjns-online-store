import { z } from 'zod';

export const reviewSchema = z.object({
  id: z.number(),
  rating: z.number(),
  text: z.string(),
  productId: z.number(),
  userId: z.number(),
});

export const newReviewSchema = z.object({
  rating: z.number(),
  text: z.string(),
  productId: z.number(),
  userId: z.number(),
});
