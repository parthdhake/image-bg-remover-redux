import { configureStore } from '@reduxjs/toolkit';
import statusReducer from '../features/removebg/removebgSlice';

export const store = configureStore({
  reducer: {
    status: statusReducer
  },
});
