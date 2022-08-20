import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getContactsUser, deleteContact} from '../../Redux/contacts/contactsSlice';
import ModalUpdateContact from '../Modal/ModalUpdateContact';
import { DeleteSvgSelector } from './DeleteSvgSelector';
import { RedactSvgSelector } from './RedactSvgSelector';
import styles from './ContactsList.module.css';


function ContactsList() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [contactId, setContactId] = useState('');
    const [updateContactName, setupdateContactName] = useState('');
    const [updateContactNumber, setupdateContactNumber] = useState('');
    const filter = useSelector((state) => state.persistedReducer.contacts.contacts.filter);
    const contacts = useSelector((state) => state.persistedReducer.contacts.contacts.items);
    console.log(contacts)
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
        <ul className={styles.contactsList}>
            {visibleContact.map(contact => (
                            
                <li key={contact.id} className={styles.contactItem}>
                    {showModal&&<ModalUpdateContact id={contactId} name={updateContactName} number={updateContactNumber} onClose={toggleModal}/>}
                    <p className={styles.contactData}>{contact.name}:  {contact.number}</p>
                    <div>
                        <button
                            type="button"
                            onClick={()=>dispatch(deleteContact(contact.id))}
                            className={styles.buttonDelete}
                            >
                            <DeleteSvgSelector id='bin' />    
                            {/* Видалити */}
                        </button>
                        <button
                            type="button"
                            onClick={()=>toggleModal(contact.id, contact.name, contact.number )}
                            className={styles.buttonDelete}
                            >
                            <RedactSvgSelector id='pencil' />
                            {/* Редагувати */}
                        </button>
                    </div>
                    
                </li>
                
                
            ))}
        </ul>
        </>
        
    ); 
   
}

export default ContactsList;


