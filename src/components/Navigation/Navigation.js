import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../Navigation/Navigation.module.css';

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
            <svg className={style.icon}  width="14" height="15">
              <use href="./addressbook.svg"></use>
            </svg>
        </div>
      </div>
           
    </NavLink>
  </nav>
);

export default Navigation;