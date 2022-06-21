// import { useState } from 'react';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '../../Redax/auth/auth-operetions';
import { setUser } from '../../Redax/auth/auth-slice';

// import { authOperations } from '../redux/auth';
// import {useCreateUserMutation} from '../Redax/auth/auth-slice';
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
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      const newUser = await registerUser({ name, email, password });
      dispatch(setUser(newUser));
    } catch (error) {
      // console.warn(error);
    }
  };
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [createUser, error, isLoading] = useCreateUserMutation();

  // const handleChange = ({ target: { name, value } }) => {
  //   switch (name) {
  //     case 'name':
  //       return setName(value);
  //     case 'email':
  //       return setEmail(value);
  //     case 'password':
  //       return setPassword(value);
  //     default:
  //       return;
  //   }
  // };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   const userName = e.currentTarget.elements.name.value;
  //   const userEmail = e.currentTarget.elements.email.value;
  //   const userPassword = e.currentTarget.elements.password.value;
  //   const userData = {userName, userEmail, userPassword};
  //   createUser(userData)
  //     .unwrap()
  //     .catch((error) => {
  //       if(error.data.name){
  //         const email = error.data.keyValue.email;
  //         alert(`Користувач з поштою "${email}" вже зареєстрований`)
  //       }else{
  //         alert('Пароль маэ складатися не меньше чим із 7 символів')
  //       }
  //       console.log(error)
  //     });
    
       
  //   // dispatch(authOperations.register({ name, email, password }));
  //   setName('');
  //   setEmail('');
  //   setPassword('');
    
  // };

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