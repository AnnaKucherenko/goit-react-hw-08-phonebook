import React from 'react';
import { useState} from 'react';
import Modal from 'components/Modal/Modal';
import ContactList from "../../components/contactList/ContactList";
// import FormAddContact from '../../components/form/FormAddContact';
import Filter from '../../components/filter/Filter';
import { useDeleteContactMutation, useFetchContactsQuery } from "Redax/contactsSlice";
import { Loader } from "components/Loader/Loader";
import style from '../ContactsPage/ContactsPage.module.css'

export const ContactsPage=()=>{
    const {data, isFetching} = useFetchContactsQuery();
    const [deleteContact] = useDeleteContactMutation();
    const [showModal, setShowModal] = useState(false);

    const toggleModal=()=>{
        setShowModal(!showModal);
    };

    return(
    <div className={style.container}>
        {showModal&&<Modal onClose={toggleModal}/>}
        <button className={style.button} onClick={()=>toggleModal()} >Додати контакт</button>
                
        <h2 className={style.title}>Контакти</h2>
        <Filter />
        {isFetching&&<Loader/>}
        {data&& <ContactList contacts={data} onDelete={deleteContact}/>}
    </div>
    )
}