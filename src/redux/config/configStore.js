import { configureStore } from '@reduxjs/toolkit';
import fanLetterSlice from 'redux/modules/fanLetterSlice';

const store = configureStore({
  reducer: {
    fanLetter: fanLetterSlice,
  },
});

export default store;
