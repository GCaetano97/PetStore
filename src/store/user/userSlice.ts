/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface userState {
  user: boolean,
  username: string
}

const initialState: userState = {
  user: false,
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<boolean>) => {
      state.user = payload;
    },
    setUsername: (state, { payload }: PayloadAction<string>) => {
      state.username = payload;
    },
  },
});

export const { setUser, setUsername } = userSlice.actions;
export default userSlice.reducer;
export const userSelector = (state: { userStore: userState}) => state.userStore;
