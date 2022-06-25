import React from 'react';
import { 
    useSelector, 
    useDispatch } from 'react-redux';
import {setFilterContacts} from '../../Redax/contacts/contactsSlice';
import styles from './Filter.module.css';

function Filter() {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.persistedReducer.contacts.contacts.filter);
    const changeFilter = e => {
        dispatch(setFilterContacts(e.currentTarget.value));
    }
    
    return (
        <label className={styles.filterInput}>
            
            <input 
            type="text" 
            value={filter} 
            onChange={changeFilter} 
            className={styles.input}
            placeholder="Пошук контакту за ім`ям"
            >
            </input>
        </label>
    )
    
}

export default Filter;