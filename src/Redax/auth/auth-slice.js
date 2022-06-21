import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    user: { 
      name: '', 
      email: '', 
    },
    token:'',
//   isLoggedIn: false,
};

export const fetchUser = createAsyncThunk(
    'auth/register',
    
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    setUser(state, { payload }) {
        return payload;
    },
    deleteUser(state) {
        return { ...initialState };
    },
   },
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