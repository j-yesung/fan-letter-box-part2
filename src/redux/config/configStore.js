import { configureStore } from '@reduxjs/toolkit';
import fanLetterSlice from 'redux/modules/fanLetterSlice';
import userInfoSlice from 'redux/modules/userInfoSlice';

const store = configureStore({
  reducer: {
    fanLetter: fanLetterSlice,
    userInfo: userInfoSlice,
  },
});

export default store;
