import React from 'react';
import ContactList from "../components/contactList/ContactList";
import FormAddContact from '../components/form/FormAddContact';
import Filter from '../components/filter/Filter';
import { useDeleteContactMutation, useFetchContactsQuery } from "Redax/contactsSlice";
import { Loader } from "components/Loader/Loader";

export const ContactsPage=()=>{
    const {data, isFetching} = useFetchContactsQuery();
    const [deleteContact] = useDeleteContactMutation();

    return <div>
        <h1>Phonebook</h1>
        <FormAddContact contacts={data}/>
        
        <h2>Contacts</h2>
        <Filter />
        {isFetching&&<Loader/>}
        {data&& <ContactList contacts={data} onDelete={deleteContact}/>}
        </div>
}