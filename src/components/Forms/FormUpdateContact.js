import React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {updateContact} from '../../Redux/contacts/contactsSlice';
import PropTypes from "prop-types";
import styles from './FormAddContact.module.scss';

export default function FormUpdateContact ({id, updateName, updateNumber, onClose}){
    const dispatch= useDispatch();
    const [name, setName] = useState(updateName);
    const [number, setNumber] = useState(updateNumber);
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
                            Ім`я
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
                            Номер телефону
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
                <button type='submit' className={styles.buttontForm} disabled={isLoading}>Оновити контакт</button>
            </div>
           
            </form>
        );
    
}

FormUpdateContact.propTypes = {
    onClose: PropTypes.func.isRequired,
    id:PropTypes.string.isRequired,
    updateName:PropTypes.string.isRequired, 
    updateNumber:PropTypes.string.isRequired, 
}