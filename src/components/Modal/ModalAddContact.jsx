import { useEffect } from 'react'; 
import {createPortal}from 'react-dom';
import PropTypes from "prop-types";
import FormAddContact from '../form/FormAddContact.js';
// import FormUpdateContact from '../form/FormUpdateContact.js'
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function ModalAddContact ({onClose}) {
    useEffect(()=>{
        const handleKeyDown = e => {
                if(e.code === 'Escape'){
                    onClose();
                }
            }

        window.addEventListener('keydown', handleKeyDown);
        return ()=>{
            window.removeEventListener('keydown', handleKeyDown);
        }
    },[onClose]);
    
    const handleBackdropClick = evt =>{
        if(evt.currentTarget === evt.target){
            onClose();
        }
    }

    return createPortal(
            <div className={styles.overlay} onClick ={handleBackdropClick}>
                <div className={styles.modal}>
                    <FormAddContact onClose={onClose}/>
                </div>
            </div>, 
            modalRoot,
    );
    
}

ModalAddContact.propTypes = {
    onClose: PropTypes.func.isRequired,
}