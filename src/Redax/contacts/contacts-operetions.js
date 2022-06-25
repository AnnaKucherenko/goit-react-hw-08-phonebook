import axios from 'axios';
import {getUserToken} from '../auth/auth-operetions';

const baseURL = 'https://connections-api.herokuapp.com/contacts';

export const fetchGetContactsUser = () =>{
    return axios.get(`${baseURL}`, {
        headers: {
            Authorization: getUserToken(),
        },
    })
    // .then((response)=>{
    //   const contactsUser = response.data;
    //   console.log(contactsUser);
    //   return contactsUser;
    // })
    // .catch((error)=>console.log(error.message))
};

export const fetchCreateNewContact = (body) =>{
    return axios.post(`${baseURL}`, {
        headers: {
            Authorization: getUserToken(),
        },
    }, 
    body);
    // .then((body)=>{return body})
    // .catch((error)=>{alert ('Електронна адреса або пароль вказані не вірно')})
};

export const fetchDeleteContact = (contactId) => {
    axios.delete(`${baseURL}/{${contactId}}`, {
      headers: {
        Authorization: getUserToken(),
      },
    });
};
  
export const fetchUpdateContact = (contactId, body) => {
    axios.patch(`${baseURL}/{${contactId}}`, {
      headers: {
        Authorization: getUserToken(),
      },
    }, 
    body);
};
