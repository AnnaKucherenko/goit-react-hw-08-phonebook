import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../Redax/auth/authSlice';

import style from '../RegisterPage/RegisterPage.module.css';


const registerSchema = yup.object().shape({
  name: yup.string().required('Будьласка вкажіть ім`я'),
  email: yup.string().email('Невірно вказана адреса електронної пошти').required('Будьласка вкажіть пошту'),
  password: yup
    .string()
    .test('len', 'Пароль має бути не меньше 7 символів', (val) => val.length >= 7)
    .required('Будьласка вкажіть логін'),
    
});

export default function RegisterView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      navigate("/");
      
    } catch (error) {
      console.log(error.message)
      console.warn(error);
    }
  };
  
  return (
    <div className={style.container}>
      <h1 className={style.title}>Зареєструйтесь будьласка</h1>
      <div className={style.container_form}>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)} >
        <label htmlFor="name" className={style.label}>
          Ім`я
        <input {...register('name')} type="text" name="name" autoComplete='true' className={style.input}/>
        {errors.name && <p className={style.errors}>{errors.name.message}</p>}</label>
        

        <label className={style.label}>
          Пошта
          <input
            type="email"
            name="email"
            {...register('email')}
            autoComplete='true'
            className={style.input}
          />
          {errors.email && <p className={style.errors}>{errors.email.message}</p>}
        </label>

        <label className={style.label}>
          Пароль
          <input
            {...register('password')}
            type="password"
            name="password"
            autoComplete="current-password"
            className={style.input}
          />
          {errors.password && <p className={style.errors}>{errors.password.message}</p>}
        </label>
        <button type="submit" className={style.button}>Зареєструватись</button>
        
      </form>
      </div>
      
    </div>
  );
}