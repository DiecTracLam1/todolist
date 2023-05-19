import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import employsheetApi from '~/api/employSheetApi';

export const getEmploySheetThunk = createAsyncThunk(
  'employSheet/getEmploySheet',
  async (payload, thunkAPI) => {
    try {
      const data = await employsheetApi.getAll(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getDetailEmploySheetThunk = createAsyncThunk(
  'employSheet/getDetail',
  async (payload) => {
    try {
      const data = await employsheetApi.getDetail(payload);
      return data.docs;
    } catch (error) {}
  }
);

export const addEmploySheetThunk = createAsyncThunk(
  'employSheet/addEmploySheet',
  async (payload , thunkAPI) => {
    try {
      const data = await employsheetApi.add(payload);
      return data.doc;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
);

export const editEmploySheetThunk = createAsyncThunk(
  'employSheet/editEmploySheet',
  async (payload) => {
    try {
      const data = await employsheetApi.edit(payload);
      return data.doc;
    } catch (error) {}
  }
);

export const deleEmploySheetThunk = createAsyncThunk(
  'employSheet/deleteEmploySheet',
  async (payload) => {
    try {
      await employsheetApi.delete(payload);
      return payload;
    } catch (error) {}
  }
);

export const timesheetSlice = createSlice({
  name: 'employSheetSlice',
  initialState: {
    data: { docs: [], total: 0 },
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmploySheetThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEmploySheetThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = {};
    });
    builder.addCase(getEmploySheetThunk.rejected, (state, action) => {
      state.data = {};
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editEmploySheetThunk.fulfilled, (state, action) => {
      const data = action.payload;
      const index = state.data.docs.findIndex((todo) => todo.id === data.id);
      state.data.docs[index] = { ...state.data.docs[index], ...data };
    });

    builder.addCase(addEmploySheetThunk.rejected, (state, action) => {
      throw new Error(action.payload.errorCode)
    });

    builder.addCase(deleEmploySheetThunk.fulfilled, (state, action) => {
      const id = action.payload;
      const newArray = state.data.docs.filter((todo) => todo.id !== id);
      state.data.docs = newArray;
    });
  },
});

export default timesheetSlice.reducer;
