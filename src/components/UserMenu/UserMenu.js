// import { useDispatch, useSelector } from 'react-redux';
// import { authSelectors, authOperations } from '../../redux/auth';
import defaultAvatar from '../UserMenu/defaultAvatar.jpg';
import style from '../UserMenu/UserMenu.module.css';

export default function UserMenu() {
  // const dispatch = useDispatch();
//   const name = useSelector(authSelectors.getUsername);
  const avatar = defaultAvatar;

  return (
    <div className={style.container}>
      <img src={avatar} alt="" width="28" className={style.avatar} />
      <span className={style.name}>Вітаю, </span>
      <button type="button"
      className={style.button} 
    //   onClick={() => dispatch(authOperations.logOut())}
      >
        Вийти
      </button>
    </div>
  );
}