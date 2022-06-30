// import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getContactsUser, deleteContact} from '../../Redax/contacts/contactsSlice';
import ModalUpdataContact from 'components/Modal/ModalUpdataContact';
import styles from './ContactList.module.css';
import ModalUpdateContact from 'components/Modal/ModalUpdataContact';

function ContactList() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [contactId, setContactId] = useState('');
    const [updateContactName, setupdateContactName] = useState('');
    const [updateContactNumber, setupdateContactNumber] = useState('');
    const filter = useSelector((state) => state.persistedReducer.contacts.contacts.filter);
    const contacts = useSelector((state) => state.persistedReducer.contacts.contacts.items);
    
    useEffect(() => {
        dispatch(getContactsUser());
    }, [dispatch]);

    const normalizedFilter = filter.toLowerCase();
    const visibleContact = contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
    );

    const toggleModal=(id, name, number)=>{
        setShowModal(!showModal);
        setContactId(id);
        setupdateContactName(name);
        setupdateContactNumber(number);
    };

    return (
        <>
        <ul>
            {visibleContact.map(contact => (
                            
                <li key={contact.id}>
                    {showModal&&<ModalUpdateContact 
                    id={contactId} 
                    name={updateContactName} 
                    number={updateContactNumber}
                    onClose={toggleModal}/>}
                    {contact.name}:  {contact.number}
                    <button
                        type="button"
                        onClick={()=>dispatch(deleteContact(contact.id))}
                        className={styles.buttonDelete}
                        >
                        Видалити
                    </button>
                    <button
                        type="button"
                        onClick={()=>toggleModal(contact.id, contact.name, contact.number )}
                        className={styles.buttonDelete}
                        >
                        Редагувати
                    </button>
                </li>
                
                
            ))}
        </ul>
        </>
        
    ); 
   
}

export default ContactList;
