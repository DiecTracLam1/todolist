import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import brandApi from '~/api/brandApi';

export const getDataThunk = createAsyncThunk('todoSlice/getData', async (payload, thunkAPI) => {
  try {
    const data = await brandApi.getAll(payload?.offset, payload.limit, payload.searchText);
    return data.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getDetailThunk = createAsyncThunk('todoSlice/getDetail', async (payload) => {
  try {
    const data = await brandApi.getDetail(payload);
    return data.data.data.docs;
  } catch (error) {}
});

export const addTodoThunk = createAsyncThunk('todoSlice/addTodo', async (payload) => {
  try {
    const data = await brandApi.add(payload);
    return data.data.data.doc;
  } catch (error) {}
});

export const editTodoThunk = createAsyncThunk('todoSlice/editTodo', async (payload) => {
  try {
    const data = await brandApi.edit(payload);
    return data.data.data.doc;
  } catch (error) {}
});

export const deleTodoThunk = createAsyncThunk('todoSlice/deleteTodo', async (payload) => {
  try {
    await brandApi.delete(payload);
    return payload;
  } catch (error) {}
});

export const searchTodoThunk = createAsyncThunk('todoSlice/search', async (payload) => {
  try {
    const data = await brandApi.search();
    return data.data.data.docs;
  } catch (error) {}
});

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: {
    data: { docs: [], total: 0 },
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDataThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = {};
    });
    builder.addCase(getDataThunk.rejected, (state, action) => {
      state.data = {};
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editTodoThunk.fulfilled, (state, action) => {
      const data = action.payload;
      const index = state.data.docs.findIndex((todo) => todo.id === data.id);
      state.data.docs[index] = data;
    });

    builder.addCase(addTodoThunk.fulfilled, (state, action) => {
      const data = action.payload;
      const newArray = [data, ...state.data.docs];
      state.data.docs = newArray;
    });

    builder.addCase(deleTodoThunk.fulfilled, (state, action) => {
      const id = action.payload;
      const newArray = state.data.docs.filter((todo) => todo.id !== id);
      state.data.docs = newArray;
    });

    builder.addCase(searchTodoThunk.fulfilled, (state, action) => {
      state.data.docs = action.payload;
    });
  },
});

export default todoSlice.reducer;
