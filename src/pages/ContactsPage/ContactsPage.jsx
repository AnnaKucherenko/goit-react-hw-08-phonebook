import React from 'react';
import ContactList from "../../components/contactList/ContactList";
import FormAddContact from '../../components/form/FormAddContact';
import Filter from '../../components/filter/Filter';
import { useDeleteContactMutation, useFetchContactsQuery } from "Redax/contactsSlice";
import { Loader } from "components/Loader/Loader";
import style from '../ContactsPage/ContactsPage.module.css'

export const ContactsPage=()=>{
    const {data, isFetching} = useFetchContactsQuery();
    const [deleteContact] = useDeleteContactMutation();

    return(
    <div className={style.container}>
        <h1>Телефонна книга</h1>
        <FormAddContact contacts={data}/>
        
        <h2>Контакти</h2>
        <Filter />
        {isFetching&&<Loader/>}
        {data&& <ContactList contacts={data} onDelete={deleteContact}/>}
    </div>
    )
}