import React from 'react';
import { useState} from 'react';
import Modal from 'components/Modal/Modal';
import ContactList from "../../components/contactList/ContactList";
// import FormAddContact from '../../components/form/FormAddContact';
import Filter from '../../components/filter/Filter';
// import { useDeleteContactMutation, useFetchContactsQuery } from "Redax/contacts/contactsSlice";
import { Loader } from "components/Loader/Loader";
import { deleteContact, getContactsUser } from '../../Redax/contacts/contactsSlice';
import style from '../ContactsPage/ContactsPage.module.css'
import { useDispatch, useSelector } from 'react-redux';

export const ContactsPage= async()=>{
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const isLoader = useSelector((state) => state.persistedReducer.contacts.loading); 

    
    const contactsUser = await dispatch(getContactsUser()).unwrap();
    console.log(contactsUser);
    // try {
    //     // const contactsUser =
         
    // // console.log(contactsUser);
        
    //   } catch (error) {
    //     console.log(error.message);
    //     console.warn(error);
    // }

    
    console.log(contactsUser);
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
        {contactsUser.length>0&&<ContactList contacts={contactsUser} onDelete={deleteContact}/>}
    </div>
    )
}