import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import timesheetApi from '~/api/employSheetApi';

export const getEmploySheetThunk = createAsyncThunk('employSheet/getEmploySheet', async (payload, thunkAPI) => {
  try {
    const data = await timesheetApi.getAll(payload);
    return data.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getDetailEmploySheetThunk = createAsyncThunk('employSheet/getDetail', async (payload) => {
  try {
    const data = await timesheetApi.getDetail(payload);
    return data.data.data.docs;
  } catch (error) {}
});

export const addEmploySheetThunk = createAsyncThunk('employSheet/addBrand', async (payload) => {
  try {
    const data = await timesheetApi.add(payload);
    console.log(data)
    return data.data.data.doc;
  } catch (error) {}
});

export const editBrandThunk = createAsyncThunk('employSheet/editBrand', async (payload) => {
  try {
    const data = await timesheetApi.edit(payload);
    return data.data.data.doc;
  } catch (error) {}
});

export const deleBrandThunk = createAsyncThunk('employSheet/deleteBrand', async (payload) => {
  try {
    await timesheetApi.delete(payload);
    return payload;
  } catch (error) {}
});

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

    builder.addCase(editBrandThunk.fulfilled, (state, action) => {
      const data = action.payload;
      const index = state.data.docs.findIndex((todo) => todo.id === data.id);
      state.data.docs[index] = {...state.data.docs[index] , ...data};
    });

    builder.addCase(addEmploySheetThunk.fulfilled, (state, action) => {
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
