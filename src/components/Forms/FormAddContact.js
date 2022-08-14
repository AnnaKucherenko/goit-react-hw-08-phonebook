import React from 'react';
import InputMask from 'react-input-mask';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {createNewContact} from '../../Redux/contacts/contactsSlice';
import PropTypes from "prop-types";
import styles from './FormAddContact.module.css';


export default function FormAddContact ({onClose}){
    
    const dispatch= useDispatch();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const isLoading = useSelector((state) => state.persistedReducer.contacts.loading);
    const contacts = useSelector((state) => state.persistedReducer.contacts.contacts.items);
    
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
        const isFindContact = contacts.find(contact=>contact.name===name);
        if (isFindContact) {
            alert(`Контакт ${name} вже існує`);
        } else {
            try{
                await dispatch(createNewContact(contactData)).unwrap();
                    
            }catch(error){
                console.log(error.message);
            }
            onClose();
        }
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
                        <InputMask 
                            mask="+38(999) 999-99-99"
                            maskChar={null}
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                            value={number}
                            onChange={handleChange}
                            className={styles.inputModal}
                            placeholder='(000) 000-00-00'                            
                        />
                                               
                        
                    </div>
                <button type='submit' className={styles.buttontForm} disabled={isLoading}>Add contact</button>
            </div>
           
            </form>
        );
    
}

FormAddContact.propTypes = {
    onClose: PropTypes.func.isRequired,
   
}

