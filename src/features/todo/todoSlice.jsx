import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import brandApi from '../../api/brandApi';

export const getData = createAsyncThunk('todoSlice/getData', async () => {
  try {
    const data = await brandApi.getAll();
    console.log(data.data.data.docs);
    return data.data.data.docs;
  } catch (error) {}
});

export const getDetail = createAsyncThunk('todoSlice/getDetail', async () => {
  try {
    const data = await brandApi.getAll();
    console.log(data.data.data.docs);
    return data.data.data.docs;
  } catch (error) {}
});

export const editTodo = createAsyncThunk('todoSlice/editTodo', async (payload) => {
  try {
    const data = await brandApi.edit(payload);
    console.log(data.data.data.docs);
    return data.data.data.docs;
  } catch (error) {}
});

export const deleTodo = createAsyncThunk('todoSlice/deleteTodo', async (payload) =>{
  try {
    const data = await brandApi.delete(payload);
    console.log(data.data.data.docs);
    return data.data.data.docs;
  } catch (error) {}
})

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {
    add: (state, action) => {
      const { lastId, addText } = action.payload;
      const newTodo = [{ id: lastId + 1, content: addText, done: false }, ...state.data];
      localStorage.setItem('todoList', JSON.stringify(newTodo));
      localStorage.setItem('lastID', JSON.stringify(lastId + 1));
      state.data = [...newTodo];
    },

    done: (state, action) => {
      const id = action.payload;
      const index = state.data.findIndex((todo) => todo.id === id);
      state.data[index].done = !state.data[index].done;
      localStorage.setItem('todoList', JSON.stringify(state.data));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    // builder.addCase(deleTodo.fulfilled
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, edit , done } = todoSlice.actions;

export default todoSlice.reducer;
