import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { authOperations } from '../redux/auth';
import style from '../pages/Pages.module.css';

export default function RegisterView() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
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
    // dispatch(authOperations.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Сторінка реєстрації</h1>

      <form className={style.form} onSubmit={handleSubmit} autoComplete="off">
        <label className={style.label}>
          Ім`я
          <input type="text" name="name" value={name} onChange={handleChange} />
        </label>

        <label className={style.label}>
          Пошта
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Пароль
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Зареєструватись</button>
      </form>
    </div>
  );
}