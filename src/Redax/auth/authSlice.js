import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';
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
  // const loginUser = useSelector((state) => state.persistedReducer.auth.isLoggedIn);
  // if(loginUser) {
  //   return await authApi.getCurrentUser();
  // }
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
      state.isLoggedIn = true;
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


//За допомогою RTC 

// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// export const userApi = createApi({
//     reducerPath: 'usersApi',
//     baseQuery: fetchBaseQuery({baseUrl:'https://connections-api.herokuapp.com',
//     }),
//     tagTypes: ['user'],
//     endpoints: builder => ({
//         // fetchUser: builder.query({
//         //     query: ()=>`/users`,
//         //     providesTags: ['user'],
//         // }),
        
//         createUser: builder.mutation({
//             query:  data => ({
//                 url: '/users/signup',
//                 method: 'POST',
//                 body: ({
//                     name:data.userName,
//                     email:data.userEmail,
//                     password:data.userPassword,
//                 }),
//             }),
//             invalidatesTags:['user'],
//         }),
//         loginUser: builder.mutation({
//             query:  data => ({
//                 url: '/users/login',
//                 method: 'POST',
//                 body: ({
//                     email:data.userEmail,
//                     password:data.userPassword,
//                 }),
//             }),
//             invalidatesTags:['user'],
//         }),
//         // dataUser: builder.mutation({
//         //     query: contactId=>({
//         //         url:`/users/current`,
//         //         method: 'GET',
//         //     }),
//         //     invalidatesTags:['user'],
//         // }),
        
//     }),
// });

// export const {
//     // useFetchUsersQuery, 
//     useCreateUserMutation,
//     useLoginUserMutation,
// } =  userApi;