import React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {updateContact} from '../../Redax/contacts/contactsSlice';
import styles from './FormAddContact.module.css';

export default function FormUpdateContact ({id, updateName, updateNumber, onClose}){
    const dispatch= useDispatch();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
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
        const name = e.currentTarget.elements.name.value;
        const number = e.currentTarget.elements.number.value;
        const contactData = {name,number};
        
        // const сontactToUpdate = contacts.find(contact => contact.id === id);
        // console.log(сontactToUpdate);
        
        // const updatedName = сontactToUpdate.name;
        // const updatedNumber = сontactToUpdate.number;
        // const dataContact = {name,number};
        
        try{
            await dispatch(updateContact({id, contactData})).unwrap();
                
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
                            placeholder={updateName}
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
                            placeholder={updateNumber}
                        />
                    </div>
                <button type='submit' className={styles.buttontForm} disabled={isLoading}>Update contact</button>
            </div>
           
            </form>
        );
    
}