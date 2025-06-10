import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { loginT, UserT } from '../model/types';
import { userSchema } from '../model/schema';
import { z } from 'zod';

interface loginResponse {
  user: unknown;
  token: string;
}

export const authApi = createApi({
  reducerPath: 'api/auth',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    login: build.mutation<{ user: UserT; token: string }, loginT>({
      query: (credentieals) => ({
        url: '/login',
        method: 'POST',
        body: credentieals,
      }),
      transformResponse: (response: loginResponse) => ({
        user: userSchema.parse(response.user),
        token: z.string().parse(response.token),
      }),
    }),

    getCurrentUser: build.query<UserT, void>({
      query: () => 'me',
      transformResponse: (response: unknown) => userSchema.parse(response),
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserQuery } = authApi;
