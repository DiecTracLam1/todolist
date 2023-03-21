import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const loginThunk = createAsyncThunk('user/login', async (data, thunkAPI) => {
    try {    
        const response = await userApi.login(data);
        localStorage.setItem('user_token', response.data.data.doc.token);
        return response.data;
    } catch (error) {
        throw new Error(error.message)
    }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    loading: false,
  },
  reducers: {
    logout:(state)=>{
        localStorage.removeItem('user_token');
        state.data = {};
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(loginThunk.pending , (state,action)=>{
        state.loading = true;
    })
    builder.addCase(loginThunk.fulfilled , (state,action) =>{
        state.data = action.payload;
        state.loading = false;
    })
    builder.addCase(loginThunk.rejected , (state,action) =>{
        state.loading = false;
    })
  }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
