import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  status: z.enum(['superadmin', 'admin', 'user']),
});

export const userFormSchema = z.object({
  name: z.string().min(1, 'Имя не может быть пустым'),
  email: z.string().email(),
  password: z.string().min(3, 'Пароль не может быть пустым'),
});

export const authResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
});



export const userLoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, 'Пароль не может быть пустым'),
});
