import type { z } from 'zod';
import type { userFormSchema, userLoginFormSchema, userSchema } from './schema';

export type UserT = z.infer<typeof userSchema>;
export type UserFormT = z.infer<typeof userFormSchema>;
export type UserLoginFormT = z.infer<typeof userLoginFormSchema>;

export type UserSliceT = {
    user: UserT | null,
    isRefreshLoading: boolean;
    admin: UserT[];
    guestId: string | null;
    users: UserT[];
}