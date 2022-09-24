import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';
import style from './HeaderBar.module.scss';

export default function HeaderBar() {
  const isLoggedIn = useSelector((state) => state.persistedReducer.auth.isLoggedIn);
  return (
    <header className={style.headerBar} >
      <div className={style.container}>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </div>
      
    </header>
  );
}