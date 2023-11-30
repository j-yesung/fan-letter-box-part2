import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = userInfoSlice.actions;
export default userInfoSlice.reducer;
