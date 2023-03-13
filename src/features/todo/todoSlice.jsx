import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: {
    data: JSON.parse(localStorage?.getItem('todoList')) ?? [],
  },
  reducers: {
    add: (state, action) => {
      state.data = [...action.payload];
    },
    remove: (state, action) => {
      state.data = [...action.payload];
    },
    edit : (state , action) =>{
      state.data = [...action.payload];
    }
  },
});

// Action creators are generated for each case reducer function
export const { add , remove , edit } = todoSlice.actions;

export default todoSlice.reducer;
