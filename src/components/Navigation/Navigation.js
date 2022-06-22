import React from 'react';
import { NavLink } from 'react-router-dom';
import defaultImgLogo from '../Navigation/defaultImgLogo.png'
import style from '../Navigation/Navigation.module.css';


const logo = defaultImgLogo;
const Navigation = () => (
  
  <nav>
    <NavLink to="/"
    className={({ isActive }) => {
        return isActive
          ? [style.link, style.activeLink].join(' ')
          : style.link;
      }}
    >
      Головна
    </NavLink>

    <NavLink
    
      to="/contacts"
      className={({ isActive }) => {
        return isActive
          ? [style.link, style.activeLink].join(' ')
          : style.link;
      }}
    >
      <div className={style.nav_contacts}>
        Мої контакти
        <div className={style.logo}>
          <img src={logo} alt="" width="19" className={style.image}></img>
        </div>
      </div>
           
    </NavLink>
  </nav>
);

export default Navigation;