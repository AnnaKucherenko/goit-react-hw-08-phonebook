import {logoutUser} from '../../Redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import defaultAvatar from '../UserMenu/defaultAvatar.jpg';
import style from '../UserMenu/UserMenu.module.css';
import { useNavigate } from 'react-router-dom';

export default function UserMenu() {
  const email = useSelector((state) => state.persistedReducer.auth.user.email);
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
      <span className={style.name}>{email}</span>
      <button type="button"
      className={style.button} 
      onClick={handleLogout}
      >
        Вийти
      </button>
    </div>
  );
}