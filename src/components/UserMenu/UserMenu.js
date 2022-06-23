import {logoutUser} from '../../Redax/auth/authSlice';
import { useDispatch } from 'react-redux';
import defaultAvatar from '../UserMenu/defaultAvatar.jpg';
import style from '../UserMenu/UserMenu.module.css';
import { useNavigate } from 'react-router-dom';

export default function UserMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatar = defaultAvatar;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className={style.container}>
      <img src={avatar} alt="" width="28" className={style.avatar} />
      <span className={style.name}>Вітаю, </span>
      <button type="button"
      className={style.button} 
      onClick={handleLogout}
      >
        Вийти
      </button>
    </div>
  );
}