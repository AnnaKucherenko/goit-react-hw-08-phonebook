import axios from 'axios';

const baseURL = 'https://connections-api.herokuapp.com/users';

export const getUserToken = () => {
    const persistedData = localStorage.getItem('persist:user');
    if (!persistedData) return;
  
    return JSON.parse(JSON.parse(persistedData).auth).token;
};

export const registerUser = (userData)=>{
    return axios.post(`${baseURL}/signup`, userData)
    .then((userData)=>{return userData})
    .catch((error)=>{alert ('Користувач з такою поштою вже зареєстрований')})

};

export const loginUser = (body) =>{
    return axios.post(`${baseURL}/login`, body)
    .then((body)=>{return body})
    .catch((error)=>{alert ('Електронна адреса або пароль вказані не вірно')})
};

export const getCurrentUser = () => {
    axios.get(`${baseURL}/current`, {
      headers: {
        Authorization: getUserToken(),
      },
    });
};
  
export const logoutUser = () => {
    axios.post(`${baseURL}/logout`, null, {
      headers: {
        Authorization: getUserToken(),
      },
    });
};


  