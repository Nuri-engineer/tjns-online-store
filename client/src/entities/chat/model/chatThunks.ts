import { createAsyncThunk } from '@reduxjs/toolkit';
import chatService from '../api/chatService';
import type { NewChatT, NewMessageT } from './chatTypes';

export const getAllChats = createAsyncThunk('chat/getAllChats', () => chatService.getAllChats());

export const findOrCreateChat = createAsyncThunk('chat/findOrCreateChat', (data: NewChatT) =>
  chatService.findOrCreateChatByUserId(data),
);

export const mergeGuestChatWithUser = createAsyncThunk(
  'chat/mergeGuestChatWithUser',
  (data: NewChatT) => chatService.mergeGuestChatWithUser(data),
);

export const getAllMessagesByChat = createAsyncThunk(
  'chat/getAllMessagesByChat',
  (chatId: number) => chatService.getAllMessagesByChat(chatId),
);

export const createMessage = createAsyncThunk('chat/createMessage', (data: NewMessageT) =>
  chatService.createMessage(data),
);