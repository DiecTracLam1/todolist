import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import timesheetApi from '~/api/timesheetApi';

export const getTimesheetThunk = createAsyncThunk('timesheet/getTimesheet', async (payload, thunkAPI) => {
  try {
    const data = await timesheetApi.getAll(payload);
    return data.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getDetailTimesheetThunk = createAsyncThunk('timesheet/getDetail', async (payload) => {
  try {
    const data = await timesheetApi.getDetail(payload);
    return data.data.data.docs;
  } catch (error) {}
});

export const addBrandThunk = createAsyncThunk('timesheet/addBrand', async (payload) => {
  try {
    const data = await timesheetApi.add(payload);
    return data.data.data.doc;
  } catch (error) {}
});

export const editBrandThunk = createAsyncThunk('timesheet/editBrand', async (payload) => {
  try {
    const data = await timesheetApi.edit(payload);
    return data.data.data.doc;
  } catch (error) {}
});

export const deleBrandThunk = createAsyncThunk('timesheet/deleteBrand', async (payload) => {
  try {
    await timesheetApi.delete(payload);
    return payload;
  } catch (error) {}
});

export const timesheetSlice = createSlice({
  name: 'timesheetSlice',
  initialState: {
    data: { docs: [], total: 0 },
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTimesheetThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTimesheetThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = {};
    });
    builder.addCase(getTimesheetThunk.rejected, (state, action) => {
      state.data = {};
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editBrandThunk.fulfilled, (state, action) => {
      const data = action.payload;
      const index = state.data.docs.findIndex((todo) => todo.id === data.id);
      state.data.docs[index] = {...state.data.docs[index] , ...data};
    });

    builder.addCase(addBrandThunk.fulfilled, (state, action) => {
      const data = action.payload;
      const fullName = localStorage.getItem('fullname')
      data.BrandEmployeeCreate = {fullName}
      const newArray = [data, ...state.data.docs];
      state.data.docs = newArray;
    });

    builder.addCase(deleBrandThunk.fulfilled, (state, action) => {
      const id = action.payload;
      const newArray = state.data.docs.filter((todo) => todo.id !== id);
      state.data.docs = newArray;
    });
  },
});

export default timesheetSlice.reducer;
