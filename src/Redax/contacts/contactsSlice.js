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
  async (body) => {
    const  data  = await fetchCreateNewContact(body);
    const name = data.data.name;
    const number = data.data.number;
    const  contactData = { name, number };
    return contactData ;
       
  }
);



export const deleteContact = createAsyncThunk('contacts/delete', async (contactId) => {
  await fetchDeleteContact(contactId);
  return contactId;
  
});

export const updateContact = createAsyncThunk('contacts/update', async (dataContact) => {
  console.log(dataContact)
  const  data  = await fetchUpdateContact(dataContact);
  console.log(data, 'update')
  const updatedContact = data.data;
  return updatedContact;
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
      
    },
    [getContactsUser.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error.message;
      
    },
    [getContactsUser.pending]: (state) => {
      state.loading = true;
      
    },

    [createNewContact.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
      state.contacts.items = [...state.contacts.items, payload];
      
    },
    [createNewContact.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error.message;
      
    },
    [createNewContact.pending]: (state) => {
      state.loading = true;
      
    },

    [updateContact.fulfilled]: (state, { payload }) => {
      const {id,name,number} = payload;
      const updatedContact = {name, number};
      
      const currentArrContacts = state.contacts.items;
      const indexUpdateContact = currentArrContacts.findIndex(contact => contact.id === id);
      currentArrContacts.splice(indexUpdateContact,1,updatedContact);
      state.contacts.items = currentArrContacts;
      // const contactArr = currentArrContacts.filter(contact => contact.id !== payload.id);
      // state.contacts.items = [...contactArr, updatedContact];
      state.loading = false;
    },
    [updateContact.rejected]: (state) => {
      state.loading = false;
    },
    [updateContact.pending]: (state) => {
      state.loading = true;
    },

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