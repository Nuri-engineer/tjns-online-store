import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UserFormT, UserLoginFormT } from './types';
import userService from '../api/userService';

export const signupAdmin = createAsyncThunk('user/signupAdmin', (data: UserFormT) =>
  userService.sigupAdmin(data),
);

export const getAdmin = createAsyncThunk('user/getAdmin', () => userService.getAdmin());

export const getUsers = createAsyncThunk('user/getUsers', () => userService.getUsers());

export const signupUser = createAsyncThunk('user/signupUser', (data: UserFormT) =>
  userService.signupUser(data),
);

export const loginUser = createAsyncThunk('user/loginUser', (data: UserLoginFormT) =>
  userService.loginUser(data),
);

export const refreshUser = createAsyncThunk('user/refreshUser', () =>
  userService.refreshUser(),
);

export const logoutUser = createAsyncThunk('user/logoutUser', () =>
  userService.logoutUser(),
);

