import React  from 'react';
import { useState} from 'react';
import {  useSelector } from 'react-redux';
import ContactList from "../../components/ContactsList/ContactList";
import {Filter} from '../../components/FilterContacts/Filter';
import { Loader } from "components/Loader/Loader";
import ModalAddContact from 'components/Modal/ModalAddContact';
import {ContactsSvgSelector} from './ContactsSvgSelector';
import style from '../ContactsPage/ContactsPage.module.css';


export default function ContactsPage(){
    const [showModal, setShowModal] = useState(false);
    const isLoader = useSelector((state) => state.persistedReducer.contacts.loading); 
    
    const toggleModal=()=>{
        setShowModal(!showModal);
    };

    return(
    <div className={style.container}>
        {showModal&&<ModalAddContact  onClose={toggleModal}/>}
        <button className={style.button} onClick={()=>toggleModal()}>Додати контакт</button>
        <div className={style.containerTitle}>
            <div className={style.containerLogo}>
                <ContactsSvgSelector id='address-book' />        
            </div>
            <h2 className={style.title}>Контакти</h2>
        </div>
        
        <Filter />
        {isLoader&&<Loader/>}
        <ContactList />
    </div>
    )
}