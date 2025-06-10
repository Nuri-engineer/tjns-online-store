import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  number: z.string(),
  status: z.string(),
});

export const loginShema = z.object({
    email: z.string(),
    password: z.string(),
})