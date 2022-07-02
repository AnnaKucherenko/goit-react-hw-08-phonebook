import axios from 'axios';
import {getUserToken} from '../auth/authOperetions';

const baseURL = 'https://connections-api.herokuapp.com/contacts';

export const fetchGetContactsUser = () =>{
    return axios.get(`${baseURL}`, {
        headers: {
            Authorization: getUserToken(),
        },
    })
    
};

export const fetchCreateNewContact = (body) =>{
    return axios.post(`${baseURL}`, body,{
        headers: {
            Authorization: getUserToken(),
        },
    },
    
    )
    
};

export const fetchDeleteContact = (contactId) => {
    return axios.delete(`${baseURL}/${contactId}`, {
      headers: {
        Authorization: getUserToken(),
      },
    });
};
  
export const fetchUpdateContact = (contactData) => {
    console.log(contactData.id)
    console.log(contactData.contactData)
    const contactId = contactData.id;
    const body = contactData.contactData
    return axios.patch(`${baseURL}/${contactId}`, body, {
      headers: {
        Authorization: getUserToken(),
      },
    });
};
