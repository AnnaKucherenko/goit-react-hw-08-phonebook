import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import style from '../Navigation/Navigation.module.css';

const Navigation= () => {
  const isLoggedIn = useSelector((state) => state.persistedReducer.auth.isLoggedIn);
  return (
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

      {isLoggedIn && (
      <NavLink
      
        to="/contacts"
        className={({ isActive }) => {
          return isActive
            ? [style.link, style.activeLink].join(' ')
            : style.link;
        }}
        >
        <div className={style.nav_contacts}>
          <span>Мої контакти</span>
          <div className={style.logo}>
              <svg className={style.icon}  width="14" height="15">
                <use href="./addressbook.svg"></use>
              </svg>
          </div>
        </div>
            
      </NavLink>
      )}
     </nav> 
  )
   
}
 
export default Navigation;