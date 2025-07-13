import { createSlice } from '@reduxjs/toolkit';
import type { UserSliceT } from './types';
import {
  getAdmin,
  getUsers,
  loginUser,
  logoutUser,
  refreshUser,
  signupAdmin,
  signupUser,
} from './userThunks';
import { v4 as uuidv4 } from 'uuid';

const initialState: UserSliceT = {
  user: null,
  isRefreshLoading: false,
  admin: [],
  guestId: null,
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin.push(action.payload);
    },


    
    initGuestId: (state) => {
      let id = localStorage.getItem('guestId');
      if (!id) {
        id = uuidv4();
        localStorage.setItem('guestId', id);
      }
      state.guestId = id;
    },
    removeGuestId: (state) => {
      localStorage.removeItem('guestId');
      state.guestId = null;
    },
  },
  extraReducers(builder) {

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (_, action) => {
      console.error(action.error);
    });
    builder.addCase(getUsers.pending, (state) => {
      state.users = [];
    });


    builder.addCase(signupAdmin.fulfilled, (_, action) => {
      console.log(action.payload);
    });
    builder.addCase(signupAdmin.rejected, (_, action) => {
      console.error(action.error);
    });

    builder.addCase(getAdmin.fulfilled, (state, action) => {
      state.admin = action.payload;
    });
    builder.addCase(getAdmin.rejected, (_, action) => {
      console.error(action.error);
    });

    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      console.error(action.error);
      state.user = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.error(action.error);
      state.user = null;
    });

    builder.addCase(refreshUser.fulfilled, (state, action) => {
      state.isRefreshLoading = false;
      state.user = action.payload;
    });
    builder.addCase(refreshUser.rejected, (state, action) => {
      state.isRefreshLoading = false;
      console.error(action.error);
      state.user = null;
    });
    builder.addCase(refreshUser.pending, (state) => {
      state.isRefreshLoading = true;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    });
    builder.addCase(logoutUser.rejected, (_, action) => {
      console.error(action.error);
    });
  },
});

export const { removeGuestId, initGuestId, setAdmin } = userSlice.actions;

export default userSlice.reducer;
