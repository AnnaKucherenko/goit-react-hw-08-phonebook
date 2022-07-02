import { useEffect } from 'react'; 
import {createPortal}from 'react-dom';
import PropTypes from "prop-types";
import FormUpdateContact from '../Forms/FormUpdateContact'
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function ModalUpdateContact ({id, name, number, onClose}) {
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
                    <FormUpdateContact 
                    id={id}
                    updateName={name}
                    updateNumber={number}
                    onClose={onClose}/>
                </div>
            </div>, 
            modalRoot,
    );
    
}


ModalUpdateContact.propTypes = {
    onClose: PropTypes.func.isRequired,
    id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired, 
    number:PropTypes.string.isRequired, 
}