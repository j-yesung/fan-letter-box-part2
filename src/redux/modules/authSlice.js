import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../apis/api/user';

export const fetchUserInfo = createAsyncThunk('userInfo/fetchUserInfo', async (accessToken, thunkAPI) => {
  try {
    const response = await API.get('/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('공습 경보!' + error.message);
  }
});

const initialState = {
  accessToken: null,
  userInfo: null,
  loading: false,
  error: null,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setAccessToken, setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
