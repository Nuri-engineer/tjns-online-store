import { z } from 'zod';
import { loginShema, userSchema } from './schema';

export type UserT = z.infer<typeof userSchema>;

export type UserSliceT = {
  user: UserT | null;
};

export type loginT = z.infer<typeof loginShema>;
