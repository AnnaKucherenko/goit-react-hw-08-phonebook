import { useEffect } from 'react'; 
import {createPortal}from 'react-dom';
import PropTypes from "prop-types";
import FormAddContact from '../../components/form/FormAddContact';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({ onClose}) {
    useEffect(()=>{
        const handleKeyDown = e => {
                if(e.code === 'Escape'){
                    onClose();
                }
            }

        window.addEventListener('keydown', handleKeyDown);
        return ()=>{
            // console.log('функція розмонтування');
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

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
}