import React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { useAddContactMutation } from 'Redax/contacts/contactsSlice';
import {createNewContact} from '../../Redax/contacts/contactsSlice';
import styles from './FormAddContact.module.css';

export default function FormAddContact ({contacts, onClose}){
    const dispatch= useDispatch();
    
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    // const [addContact, {isLoading}] = useAddContactMutation();
    const isLoading = useSelector((state) => state.persistedReducer.contacts.loading);
    
    const handleChange = (event) => {
        const { name, value } = event.currentTarget;
        if(name==='name'){
           setName(value);  
        }
        if(name==='number'){
           setNumber(value); 
        }
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        const contactName = e.currentTarget.elements.name.value;
        const contactPhone = e.currentTarget.elements.number.value;
        const contactData = {contactName,contactPhone};
        // const isFindContact = contacts.find(contact=>contact.name===name);
        // if (isFindContact) {
        //     alert(`${name} is already in contacts`);
        // } else {
            
            // createNewContact(contactData);
            
        // }
        try{
            await dispatch(createNewContact(contactData)).unwrap();
                
        }catch(error){
            console.log(error.message);
                
        }
        onClose();
        reset();
    }

    const reset = () => {
        setName('');
        setNumber('');
    }

   
        return (
            <form  onSubmit={handleSubmit}>
                <div className={styles.formContact} >
                    <div className={styles.inputForm}>
                        <label  htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                            value={name}
                            onChange={handleChange}
                            className={styles.inputModal}
                        />
                    </div>
                    <div className={styles.inputForm}>
                        <label  htmlFor="number">
                            Number
                        </label>
                        <input
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                            value={number}
                            onChange={handleChange}
                            className={styles.inputModal}
                        />
                    </div>
                <button type='submit' className={styles.buttontForm} disabled={isLoading}>Add contact</button>
            </div>
           
            </form>
        );
    
}

