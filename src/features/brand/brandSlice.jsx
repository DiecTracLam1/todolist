import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import brandApi from '~/api/brandApi';

export const getDataThunk = createAsyncThunk('brandSlice/getData', async (payload, thunkAPI) => {
  try {
    const data = await brandApi.getAll(payload?.offset, payload.limit, payload.searchText);
    return data.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getDetailThunk = createAsyncThunk('brandSlice/getDetail', async (payload) => {
  try {
    const data = await brandApi.getDetail(payload);
    return data.data.data.docs;
  } catch (error) {}
});

export const addBrandThunk = createAsyncThunk('brandSlice/addBrand', async (payload) => {
  try {
    const data = await brandApi.add(payload);
    return data.data.data.doc;
  } catch (error) {}
});

export const editBrandThunk = createAsyncThunk('brandSlice/editBrand', async (payload) => {
  try {
    const data = await brandApi.edit(payload);
    return data.data.data.doc;
  } catch (error) {}
});

export const deleBrandThunk = createAsyncThunk('brandSlice/deleteBrand', async (payload) => {
  try {
    await brandApi.delete(payload);
    return payload;
  } catch (error) {}
});

export const brandSlice = createSlice({
  name: 'brandSlice',
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

export default brandSlice.reducer;
