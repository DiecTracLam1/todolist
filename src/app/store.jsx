import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '../features/todo/todoSlice';
import userSlice from '../features/user/userSlice';

export default configureStore({
  reducer: {
    todo : todoSlice,
    user : userSlice
  },
});