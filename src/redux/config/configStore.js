import { configureStore } from '@reduxjs/toolkit';
import { fanLetterSlice } from './features/fanLetterSlice';

const store = configureStore({
  reducer: {
    fanLetter: fanLetterSlice,
  },
});

export default store;
