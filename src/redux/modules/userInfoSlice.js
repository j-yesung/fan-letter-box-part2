import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    // 액세스 토큰을 저장합니다.
    setAccessToken: (state, action) => {
      console.log('action.payload: ', action.payload);
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = userInfoSlice.actions;
export default userInfoSlice.reducer;
