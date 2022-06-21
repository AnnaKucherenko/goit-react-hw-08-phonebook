import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'https://connections-api.herokuapp.com/users';

export const registerUser = (userData)=>{
    axios.post(`${baseURL}/signup`, userData)
    .then((userData)=>{return userData})
    .catch((error)=>{alert ('Користувач з такою поштою вже зареєстрований')})

};

// const logIn = createAsyncThunk('auth/register', async credentials =>{
//     try{
//         const {data} = await axios.post('/users/login', credentials);
//         return data;
//     }catch(error){
//         alert('Не вірно введені пошта або пароль');
//     }
// });


  