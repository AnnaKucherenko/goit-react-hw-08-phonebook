// import { isDisabled } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getContactsUser} from '../../Redax/contacts/contactsSlice'
import styles from './ContactList.module.css';

async function ContactList() {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.persistedReducer.contacts.contacts.filter);
    const contacts = useSelector((state) => state.persistedReducer.contacts.contacts.items);
    console.log(contacts, 'rjvgjytn cgbcjr')

    try {
        await dispatch(getContactsUser()).unwrap();
    // console.log(res, 'в трай гет запрос')
        
    } catch (error) {
        console.log(error.message);
        console.warn(error);
    }
    
    if(contacts.length>0){
        const normalizedFilter = filter.toLowerCase();
        const visibleContact = contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter)
        );

        return (
            <ul>
                {visibleContact.map(contact => (
                    <li key={contact.id}>
                        {contact.name}:  {contact.phone}
                        <button
                            type="button"
                            // onClick={() => onDelete(contact.id)}
                            className={styles.buttonDelete}
                            
                            >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        ); 
    } else{return;}
    
    
}

export default ContactList;
