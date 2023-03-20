import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const loginThunk = createAsyncThunk('user/login', async (data, thunkAPI) => {
    console.log(data)
    try {       
        const response = await userApi.login(data);
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
        localStorage.removeItem('logout');
        state.data = {};
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(loginThunk.pending , (state,action)=>{
        state.loading = true;
    })
    builder.addCase(loginThunk.fulfilled , (state,action) =>{
        state.data = action.payload;
        localStorage.setItem('user_token', action.payload.data.doc.token);
        state.loading = false;
    })
    builder.addCase(loginThunk.rejected , (state,action) =>{
        state.loading = false;
    })
  }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
