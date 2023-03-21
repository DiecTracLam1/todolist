import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import brandApi from '../../api/brandApi';

export const getDataThunk = createAsyncThunk('todoSlice/getData', async () => {
  try {
    const data = await brandApi.getAll();
    console.log(data)
    return data.data.data.docs;
  } catch (error) {
  }
});

export const getDetailThunk = createAsyncThunk('todoSlice/getDetail', async (payload) => {
  try {
    const data = await brandApi.getDetail(payload);
    return data.data.data.docs;
  } catch (error) {}
});

export const addTodoThunk = createAsyncThunk('todoSlice/addTodo', async (payload) =>{
  try {
    const data = await brandApi.add(payload);
    return data.data.data.doc;
  } catch (error) {
    
  }
})

export const editTodoThunk = createAsyncThunk('todoSlice/editTodo', async (payload) => {
  try {
    const data = await brandApi.edit(payload);
    return data.data.data.doc;
  } catch (error) {}
});

export const deleTodoThunk = createAsyncThunk('todoSlice/deleteTodo', async (payload) =>{
  try {
    const data = await brandApi.delete(payload);
    console.log(data);
    return payload;
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
  },
  extraReducers: (builder) => {
    builder.addCase(getDataThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDataThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(editTodoThunk.fulfilled, (state, action) => {
      const data = action.payload
      const index = state.data.findIndex(todo => todo.id === data.id);
      state.data[index] = data;
    });

    builder.addCase(addTodoThunk.fulfilled , (state, action) => {
      const data = action.payload;
      const newArray = [data , ...state.data]
      state.data = newArray;
    })

    builder.addCase(deleTodoThunk.fulfilled, (state, action) => {
      const id = action.payload
      const newArray = state.data.filter(todo => todo.id !== id)
      state.data = newArray;
    })
  },
});

// Action creators are generated for each case reducer function
export const { add } = todoSlice.actions;

export default todoSlice.reducer;
