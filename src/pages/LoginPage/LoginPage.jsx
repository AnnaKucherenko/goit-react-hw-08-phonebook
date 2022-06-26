import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from 'Redax/auth/authSlice';

import style from '../LoginPage/LoginPage.module.css'

export default function LoginView() {
  const token = useSelector((state) => state.persistedReducer.auth.token);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = location.state ?? '/';

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(loginUser({email,password})).unwrap();
      navigate({redirectPath}, { replace: true });
    } catch (error) {
      console.log(error.message);
      
    }
    // setEmail('');
    // setPassword('');
  };

  if (token) {
    return <Navigate to="/contacts" replace />;
  }

  return (
    <div className={style.container}>
      <h1 className={style.title}>Введіть логін та пароль</h1>
      <div className={style.container_form}>
        <form onSubmit={handleSubmit}  autoComplete="off">
        <label className={style.label}>
          Електронна адреса
          <input
            type="email"
            name="email"
            value={email}
            autoComplete='true'
            onChange={handleChange}
            className={style.input}
          />
        </label>

        <label className={style.label}>
          Пароль
          <input
            type="password"
            name="password"
            value={password}
            autoComplete="current-password"
            onChange={handleChange}
            className={style.input}
          />
        </label>

        <button type="submit" className={style.button} >Увійти</button>
      </form>
      </div>
      
    </div>
  );
}