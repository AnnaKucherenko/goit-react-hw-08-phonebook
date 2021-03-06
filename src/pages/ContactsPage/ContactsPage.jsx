import React  from 'react';
import { useState} from 'react';
import ContactList from "../../components/ContactsList/ContactList";
// import FormAddContact from '../../components/form/FormAddContact';
import {Filter} from '../../components/FilterContacts/Filter';
// import { useDeleteContactMutation, useFetchContactsQuery } from "Redax/contacts/contactsSlice";
import { Loader } from "components/Loader/Loader";
import ModalAddContact from 'components/Modal/ModalAddContact';
// import { deleteContact, getContactsUser } from '../../Redax/contacts/contactsSlice';
import {  useSelector } from 'react-redux';
import style from '../ContactsPage/ContactsPage.module.css'


export default function ContactsPage(){
    // const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const isLoader = useSelector((state) => state.persistedReducer.contacts.loading); 
    
    // console.log(contactsUser);
    
    // try {
    //     await dispatch(getContactsUser()).unwrap();
    // // console.log(res, 'в трай гет запрос')
        
    // } catch (error) {
    //     console.log(error.message);
    //     console.warn(error);
    // }

    // useEffect(() => {
    //     dispatch(getContactsUser());
    //   }, [dispatch]);

    const toggleModal=()=>{
        setShowModal(!showModal);
    };

    return(
    <div className={style.container}>
        {showModal&&<ModalAddContact  onClose={toggleModal}/>}
        <button className={style.button} onClick={()=>toggleModal()}>Додати контакт</button>
                
        <h2 className={style.title}>Контакти</h2>
        <Filter />
        {isLoader&&<Loader/>}
        <ContactList />
    </div>
    )
}