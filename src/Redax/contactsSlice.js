import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({baseUrl:'https://connections-api.herokuapp.com',
    }),
    tagTypes: ['Contact'],
    endpoints: builder => ({
        fetchContacts: builder.query({
            query: (authorization)=>`/contacts`,
            providesTags: ['Contact'],
        }),
        deleteContact: builder.mutation({
            query: ({contactId, authorization })=>({
                url:`/contacts/${contactId}`,
                method: 'DELETE',
            }),
            invalidatesTags:['Contact'],
        }),
        addContact: builder.mutation({
            query:  ({data, authorization}) => ({
                url: '/contacts',
                method: 'POST',
                body: ({
                    name:data.contactName,
                    number:data.contactPhone,
                }),
            }),
            invalidatesTags:['Contact'],
        }),
        updateContact: builder.mutation({
            query:  ({contactId, data, authorization}) => ({
                url:`/contacts/${contactId}`,
                method: 'PATCH',
                body: ({
                    name:data.contactName,
                    number:data.contactPhone,
                }),
            }),
            invalidatesTags:['Contact'],
        }),
        
    }),
});

export const {
    useFetchContactsQuery, 
    useDeleteContactMutation, 
    useAddContactMutation,
    useUpdateContactMutation,
} = contactsApi;