import React from 'react';
import { useState} from 'react';
import Modal from 'components/Modal/Modal';
import ContactList from "../../components/contactList/ContactList";
// import FormAddContact from '../../components/form/FormAddContact';
import Filter from '../../components/filter/Filter';
// import { useDeleteContactMutation, useFetchContactsQuery } from "Redax/contacts/contactsSlice";
import { Loader } from "components/Loader/Loader";
import { deleteContact, getContactsUser } from '../../Redax/contacts/contactsSlice';
import {  useSelector } from 'react-redux';
import style from '../ContactsPage/ContactsPage.module.css'

export default async function ContactsPage(){
    const [showModal, setShowModal] = useState(false);
    const isLoader = useSelector((state) => state.persistedReducer.contacts.loading); 
    // const contactsUser=useSelector((state) => state.persistedReducer.contacts.contacts.items); 
    // console.log(contactsUser);
    
    // try {
    //     await dispatch(getContactsUser()).unwrap();
    // // console.log(res, 'в трай гет запрос')
        
    // } catch (error) {
    //     console.log(error.message);
    //     console.warn(error);
    // }

    const toggleModal=()=>{
        setShowModal(!showModal);
    };

    return(
    <div className={style.container}>
        {showModal&&<Modal onClose={toggleModal}/>}
        <button className={style.button} onClick={()=>toggleModal()} >Додати контакт</button>
                
        <h2 className={style.title}>Контакти</h2>
        <Filter />
        {isLoader&&<Loader/>}
        <ContactList  />
    </div>
    )
}