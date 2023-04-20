import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '../features/brand/brandSlice';
import userSlice from '../features/user/userSlice';
import timesheetSlice from '../features/timesheet/timesheetSlice';

export default configureStore({
  reducer: {
    todo: todoSlice,
    user: userSlice,
    timesheet : timesheetSlice
  },
});
