import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from './authOperetions';

const initialState = {
    loading: false,
    error: null,
    status: 'idle',
    isLoggedIn: false,
    token:'',
    user: { 
      name: '', 
      email: '', 
    },
    
};

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData)=>{
      const {data} =  await authApi.registerUser(userData);
      return data;
    }
);

export const getCurrentUser = createAsyncThunk('auth/current', async () => {
    return await authApi.getCurrentUser();
});

export const loginUser = createAsyncThunk('auth/login',
  async (userData) => {
    const { data } = await authApi.loginUser(userData);
    const { token, user } = data;
    return { token, user } ;
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await authApi.logoutUser();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    setUser(state, { payload }) {
        return { ...state, ...payload };
    },
    deleteUser() {
        return { ...initialState };
    },
   },
   extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      const { token, user } = payload;
      
      state.error = null;
      state.loading = false;
      state.token = token;
      state.user = user;
      state.isLoggedIn = true;
      state.status = 'success';
    },
    [registerUser.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error.message;
      state.status = 'error';
    },
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.status = 'pending';
    },

    [loginUser.fulfilled]: (state, { payload }) => {
      const { token, user } = payload;
      state.error = null;
      state.loading = false;
      state.token = token;
      state.user = user;
      state.isLoggedIn = true;
      state.status = 'authorized';
    },
    [loginUser.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error.message;
      state.status = 'unauthorized';
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.status = 'pending';
    },

    [getCurrentUser.fulfilled]: (state) => {
      state.status = 'authorized';
      state.loading = false;
      // state.isLoggedIn = true;
    },
    [getCurrentUser.rejected]: (state) => {
      state.status = 'unauthorized';
      state.loading = false;
    },
    [getCurrentUser.pending]: (state) => {
      state.status = 'pending';
      state.loading = true;
    },

    [logoutUser.fulfilled]: () => {
      return { ...initialState, status: 'unauthorized' };
    },
   }
});

export default  userSlice.reducer;
export const { setUser, deleteUser } = userSlice.actions;


