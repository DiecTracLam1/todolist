import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/api/userApi';

export const loginThunk = createAsyncThunk('user/login', async (data, thunkAPI) => {
  try {
    const response = await userApi.login(data);
    console.log(response);
    localStorage.setItem('user_token', response.doc.token);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    loading: false,
    error: {},
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user_token');
      localStorage.removeItem('employee');
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state = action.payload;
      localStorage.setItem('employee', JSON.stringify(state.doc.employee));
      state.error = {};
      state.loading = false;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
