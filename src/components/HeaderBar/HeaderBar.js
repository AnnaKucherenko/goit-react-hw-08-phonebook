import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';
// import { authSelectors } from '../redux/auth';
import style from './HeaderBar.module.css';

export default function HeaderBar() {
  const isLoggedIn = useSelector((state) => state.persistedReducer.auth.isLoggedIn);
  return (
    <header className={style.header_bar}>
      <Navigation />
      {/* <AuthNav/>
      <UserMenu/> */}
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}