import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ChatSliceT, ChatT, MessageT, NewMessageT } from './chatTypes';
import { createMessage, findOrCreateChat, getAllChats, getAllMessagesByChat, mergeGuestChatWithUser } from './chatThunks';

const initialState: ChatSliceT = {
  allChats: [],
  chat: null,
  messages: [],
  isLoading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat(state, action: PayloadAction<ChatT>) {
      state.chat = action.payload;
    },
    setMessage(state, action: PayloadAction<MessageT[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<NewMessageT> ) {
      state.messages.push(action.payload);
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    removeChat(state) {
      state.chat = null;
      state.messages = [];
    }
  },
  extraReducers(builder) {
    builder.addCase(getAllChats.fulfilled, (state, action) => {
      state.allChats = action.payload;
    })
    builder.addCase(getAllChats.rejected, (state) => {
      state.allChats = [];
    })
    builder.addCase(getAllChats.pending, (state) => {
      state.isLoading = true;
    })

    builder.addCase(findOrCreateChat.fulfilled, (state, action) => {
      state.chat = action.payload;
    })
    builder.addCase(findOrCreateChat.rejected, (state) => {
      state.chat = null;
    })
    builder.addCase(findOrCreateChat.pending, (state) => {
      state.isLoading = true;
    })

    builder.addCase(mergeGuestChatWithUser.fulfilled, (state, action) => {
      state.chat = action.payload;
    })
    builder.addCase(mergeGuestChatWithUser.rejected, (state) => {
      state.chat = null;
    })
    builder.addCase(mergeGuestChatWithUser.pending, (state) => {
      state.isLoading = true;
    })

    builder.addCase(getAllMessagesByChat.fulfilled, (state, action) => {
      state.messages = action.payload;
    })
    builder.addCase(getAllMessagesByChat.rejected, (state) => {
      state.messages = [];
    })
    builder.addCase(getAllMessagesByChat.pending, (state) => {
      state.isLoading = true;
    })

    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.messages.push(action.payload);
    })
    builder.addCase(createMessage.rejected, (state) => {
      state.messages = [];
    })
    builder.addCase(createMessage.pending, (state) => {
      state.isLoading = true;
    })
  }
});

export const { removeChat, setChat, setMessage, addMessage, setIsLoading, setError } = chatSlice.actions;
export default chatSlice.reducer;