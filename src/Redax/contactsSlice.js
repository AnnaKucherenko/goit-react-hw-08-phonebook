import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({baseUrl:'https://62a71619bedc4ca6d7c19d15.mockapi.io/',
    }),
    tagTypes: ['Contact'],
    endpoints: builder => ({
        fetchContacts: builder.query({
            query: ()=>`/contacts`,
            providesTags: ['Contact'],
        }),
        deleteContact: builder.mutation({
            query: contactId=>({
                url:`/contacts/${contactId}`,
                method: 'DELETE',
            }),
            invalidatesTags:['Contact'],
        }),
        addContact: builder.mutation({
            query:  data => ({
                url: '/contacts',
                method: 'POST',
                body: ({
                    name:data.contactName,
                    phone:data.contactPhone,
                }),
            }),
            invalidatesTags:['Contact'],
        }),
        filterContact: builder.mutation({
            query:  ({  ...patch }) => ({
                url: '/contacts',
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags:['Contact'],
        }),
    }),
});

export const {
    useFetchContactsQuery, 
    useDeleteContactMutation, 
    useAddContactMutation
} = contactsApi;