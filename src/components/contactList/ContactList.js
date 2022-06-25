// import { isDisabled } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ContactList.module.css';

function ContactList({ contacts, onDelete}) {
    const filter = useSelector((state) => state.persistedReducer.contacts.contacts.filter);
   
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
                            onClick={() => onDelete(contact.id)}
                            className={styles.buttonDelete}
                            
                            >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        );
    
}

export default ContactList;
