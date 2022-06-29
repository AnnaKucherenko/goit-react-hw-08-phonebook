// import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getContactsUser, deleteContact} from '../../Redax/contacts/contactsSlice';
import Modal from 'components/Modal/Modal';
import styles from './ContactList.module.css';

function ContactList() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [contactId, setContactId] = useState('');
    const filter = useSelector((state) => state.persistedReducer.contacts.contacts.filter);
    const contacts = useSelector((state) => state.persistedReducer.contacts.contacts.items);
    
    useEffect(() => {
        dispatch(getContactsUser());
    }, [dispatch]);

    const normalizedFilter = filter.toLowerCase();
    const visibleContact = contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
    );

    const toggleModal=(id)=>{
        setShowModal(!showModal);
        setContactId(id);
    };

    return (
        <>
        
        <ul>
            {visibleContact.map(contact => (
                            
                <li key={contact.id}>
                    {showModal&&<Modal id={contactId} onClose={toggleModal}/>}
                    {contact.name}:  {contact.number}
                    <button
                        type="button"
                        onClick={()=>dispatch(deleteContact(contact.id))}
                        className={styles.buttonDelete}
                            
                        >
                        Delete
                    </button>
                    <button
                        type="button"
                        onClick={()=>toggleModal(contact.id)}
                        className={styles.buttonDelete}
                        >
                        Update
                    </button>
                </li>
                
                
            ))}
        </ul>
        </>
        
    ); 
   
}

export default ContactList;
