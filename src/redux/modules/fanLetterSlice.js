import api from '../../axios/api';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// 등록
export const __addLetter = createAsyncThunk('fanLetter/addLetter', async (payload, thunkAPI) => {
  try {
    const response = await api.post('/fanLetter', payload);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue('공습 경보!' + error);
  }
});
// 조회
export const __fetchLetter = createAsyncThunk('fanLetter/fetchLetter', async (payload, thunkAPI) => {
  try {
    const response = await api.get('/fanLetter');
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue('공습 경보!' + error);
  }
});
// 수정
export const __updateLetter = createAsyncThunk('fanLetter/updateLetter', async (payload, thunkAPI) => {
  try {
    const { id, title, content } = payload;
    // json-server 경로 찾아가서 새로운 데이터로 바꿔주기
    const response = await api.patch(`/fanLetter/${id}`, { title, content });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue('공습 경보!' + error);
  }
});
// 삭제
export const __deleteLetter = createAsyncThunk('fanLetter/deleteLetter', async (payload, thunkAPI) => {
  try {
    await api.delete(`/fanLetter/${payload}`);
    return payload;
  } catch (error) {
    return thunkAPI.rejectWithValue('공습 경보!' + error);
  }
});

const initialState = {
  fanLetter: [],
};

const fanLetterSlice = createSlice({
  name: 'fanLetter',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // 등록
      .addCase(__addLetter.fulfilled, (state, action) => {
        state.fanLetter.push(action.payload);
      })
      // 조회
      .addCase(__fetchLetter.fulfilled, (state, action) => {
        state.fanLetter = action.payload;
      })
      // 수정
      .addCase(__updateLetter.fulfilled, (state, action) => {
        state.fanLetter = state.fanLetter.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })
      // 삭제
      .addCase(__deleteLetter.fulfilled, (state, action) => {
        const id = action.payload;
        state.fanLetter = state.fanLetter.filter(item => item.id !== id);
      });
  },
});

export default fanLetterSlice.reducer;
