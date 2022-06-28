import axios from 'axios';
import {getUserToken} from '../auth/auth-operetions';

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
  
export const fetchUpdateContact = (contactId, body) => {
    axios.patch(`${baseURL}/{${contactId}}`, {
      headers: {
        Authorization: getUserToken(),
      },
    }, 
    body);
};
