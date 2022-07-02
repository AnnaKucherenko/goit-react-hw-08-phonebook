import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGetContactsUser}from './contactsOperetions';
import { fetchCreateNewContact}from './contactsOperetions';
import { fetchDeleteContact}from './contactsOperetions';
import { fetchUpdateContact}from './contactsOperetions';


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
    return contactsUser;
  }
);

export const createNewContact = createAsyncThunk('contacts/add',
  async (body) => {
    const  data  = await fetchCreateNewContact(body);
    const  contactData = data.data ;
    return contactData;
       
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
      const sortContacts = payload;
      sortContacts.sort((a, b) => a.name > b.name ? 1 : -1);
      state.contacts.items = sortContacts;
      
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
      const sortContacts = [...state.contacts.items, payload];
      sortContacts.sort((a, b) => a.name > b.name ? 1 : -1);
      state.contacts.items = sortContacts;
      
    },
    [createNewContact.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error.message;
      
    },
    [createNewContact.pending]: (state) => {
      state.loading = true;
      
    },

    [updateContact.fulfilled]: (state, { payload }) => {
      const currentArrContacts = state.contacts.items;
      const indexUpdateContact = currentArrContacts.findIndex(contact => contact.id === payload.id);
      currentArrContacts.splice(indexUpdateContact,1,payload);
      const sortContacts = currentArrContacts.sort((a, b) => a.name > b.name ? 1 : -1);
      state.contacts.items = sortContacts;
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