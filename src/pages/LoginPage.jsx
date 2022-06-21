import { useState } from 'react';
// import {useLoginUserMutation} from '../Redax/auth/auth-slice';
// import { useDispatch } from 'react-redux';
// import { authOperations } from '../redux/auth';


export default function LoginView() {
  // const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const [loginUser, setLoginUser] = useState('');
//   const [loginUser, error] = useLoginUserMutation();

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

  const handleSubmit = e => {
    e.preventDefault();
    // const userEmail = e.currentTarget.elements.email.value;
    // const userPassword = e.currentTarget.elements.password.value;
    // const userData = {userEmail, userPassword};
    
    // loginUser(userData)
    // .unwrap()
    //   .catch((error) => {
    //     if(error){
    //       alert(`Не вірно заповнені пошта або пароль`)
    //     }
    //     console.log(error)
    //   });
    
    // dispatch(authOperations.logIn({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Сторінка логіна</h1>

      <form onSubmit={handleSubmit}  autoComplete="off">
        <label >
          Пошта
          <input
            type="email"
            name="email"
            value={email}
            autoComplete='true'
            onChange={handleChange}
          />
        </label>

        <label >
          Пароль
          <input
            type="password"
            name="password"
            value={password}
            autoComplete="current-password"
            onChange={handleChange}
          />
        </label>

        <button type="submit" >Увійти</button>
      </form>
    </div>
  );
}