import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../apis/api/data';

// 등록
export const __addLetter = createAsyncThunk('fanLetter/addLetter', async (payload, thunkAPI) => {
  try {
    const response = await API.post('/fanLetter', payload);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue('공습 경보!' + error);
  }
});
// 조회
export const __fetchLetter = createAsyncThunk('fanLetter/fetchLetter', async (payload, thunkAPI) => {
  try {
    const response = await API.get('/fanLetter');
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue('공습 경보!' + error);
  }
});
// 수정
export const __updateLetter = createAsyncThunk('fanLetter/updateLetter', async (payload, thunkAPI) => {
  console.log('payload: ', payload);
  try {
    const { id, content } = payload;
    // json-server 경로 찾아가서 새로운 데이터로 바꿔주기
    const response = await API.patch(`/fanLetter/${id}`, { content });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue('공습 경보!' + error);
  }
});
// 삭제
export const __deleteLetter = createAsyncThunk('fanLetter/deleteLetter', async (payload, thunkAPI) => {
  try {
    await API.delete(`/fanLetter/${payload}`);
    return payload;
  } catch (error) {
    return thunkAPI.rejectWithValue('공습 경보!' + error);
  }
});

const initialState = {
  fanLetter: [],
  loading: false,
  error: null,
};

const fanLetterSlice = createSlice({
  name: 'fanLetter',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // 등록
      .addCase(__addLetter.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(__addLetter.fulfilled, (state, action) => {
        state.loading = false;
        state.fanLetter.push(action.payload);
      })
      .addCase(__addLetter.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      })
      // 조회
      .addCase(__fetchLetter.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(__fetchLetter.fulfilled, (state, action) => {
        state.loading = false;
        state.fanLetter = action.payload;
      })
      .addCase(__fetchLetter.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      })
      // 수정
      .addCase(__updateLetter.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(__updateLetter.fulfilled, (state, action) => {
        state.loading = false;
        state.fanLetter = state.fanLetter.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(__updateLetter.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      })
      // 삭제
      .addCase(__deleteLetter.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(__deleteLetter.fulfilled, (state, action) => {
        state.loading = false;
        state.fanLetter = state.fanLetter.filter(item => item.id !== action.payload);
      })
      .addCase(__deleteLetter.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      });
  },
});

export default fanLetterSlice.reducer;
