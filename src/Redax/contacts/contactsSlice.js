import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';
// import * as contactsApi from './contacts-operetions';
import { fetchGetContactsUser}from './contacts-operetions';
import { fetchCreateNewContact}from './contacts-operetions';
import { fetchDeleteContact}from './contacts-operetions';
import { fetchUpdateContact}from './contacts-operetions';


const initialState = {
    loading: false,
    error: null,
    contacts: {
        items:[],
        filter: '',
    }
};

export const getContactsUser = createAsyncThunk('contacts/contacts', 
  async () => {
    const response = await fetchGetContactsUser();
    const contactsUser = response.data;
    console.log(contactsUser);
    return contactsUser;
  }
);

export const createNewContact = createAsyncThunk('contacts/add',
  async (contactData) => {
    const  data  = await fetchCreateNewContact(contactData);
    console.log(data, 'add contact');
    // const { name, number } = data;
    return data ;
       
  }
);



export const deleteContact = createAsyncThunk('contacts/delete', async (contactId) => {
  await fetchDeleteContact(contactId);
  return contactId;
});

export const updatedContact = createAsyncThunk('contacts/update', async (contactId, contactData) => {
  const  data  = await fetchUpdateContact({contactId,contactData});
  console.log(data, 'update')
  
  return data ;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: { 
    setFilterContacts(state, { payload }) {
        state.persistedReducer.contacts.filter = payload;
    },
  },
  extraReducers: {
    [getContactsUser.fulfilled]: (state, { payload }) => {
      
      state.error = null;
      state.loading = false;
      state.contacts.items = payload;
      // state.status = 'success';
    },
    [getContactsUser.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error.message;
      // state.status = 'error';
    },
    [getContactsUser.pending]: (state) => {
      state.loading = true;
      // state.status = 'pending';
    },

    [createNewContact.fulfilled]: (state, { payload }) => {
      // const { name, number } = payload;
      state.error = null;
      state.loading = false;
      state.contacts.items = [{...state, ...payload}];
          
      // state.status = 'success';
    },
    [createNewContact.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error.message;
      // state.status = 'unauthorized';
    },
    [createNewContact.pending]: (state) => {
      state.loading = true;
      // state.status = 'pending';
    },

    // [updateContact.fulfilled]: (state, { payload }) => {
    //   // state.status = 'success';
    //   state.loading = false;
      
    // },
    // [updateContact.rejected]: (state) => {
    //   // state.status = 'unauthorized';
    //   state.loading = false;
    // },
    // [updateContact.pending]: (state) => {
    //   // state.status = 'pending';
    //   state.loading = true;
    // },

    [deleteContact.fulfilled]: (state, { payload }) => {
      const currentArrContacts = state.contacts.items;
      const newArrContacts = currentArrContacts.filter(contact => contact.id !== payload);
      state.contacts.items = newArrContacts;
    },
   }
});

export default  contactsSlice.reducer;
export const {  setFilterContacts } = contactsSlice.actions;


// RTC---------------------

// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// export const contactsApi = createApi({
//     reducerPath: 'contactsApi',
//     baseQuery: fetchBaseQuery({baseUrl:'https://connections-api.herokuapp.com',
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState().persistedReducer.auth.token;
//         console.log(token);
//         if (token) {
//           headers.set('authorization', `Bearer ${token}`)
//         }
    
//         return headers
//       },
//     }),
//     tagTypes: ['Contacts'],
//     endpoints: builder => ({
//         fetchContacts: builder.query({
//             query: ()=>`/contacts`,
//             providesTags: ['Contacts'],
//         }),
//         deleteContact: builder.mutation({
//             query: ({contactId, authorization })=>({
//                 url:`/contacts/${contactId}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags:['Contact'],
//         }),
//         addContact: builder.mutation({
//             query:  ({data, authorization}) => ({
//                 url: '/contacts',
//                 method: 'POST',
//                 headers: {
//                    ' Authorization': authorization,
//                 },
//                 body: ({
//                     name:data.contactName,
//                     number:data.contactPhone,
//                 }),
//             }),
//             invalidatesTags:['Contact'],
//         }),
//         updateContact: builder.mutation({
//             query:  ({contactId, data, authorization}) => ({
//                 url:`/contacts/${contactId}`,
//                 method: 'PATCH',
//                 body: ({
//                     name:data.contactName,
//                     number:data.contactPhone,
//                 }),
//             }),
//             invalidatesTags:['Contact'],
//         }),
        
//     }),
// });

// export const {
//     useFetchContactsQuery, 
//     useDeleteContactMutation, 
//     useAddContactMutation,
//     useUpdateContactMutation,
// } = contactsApi;