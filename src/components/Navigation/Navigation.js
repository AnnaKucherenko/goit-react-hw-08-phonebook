import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {LogoSvgSelector} from './LogoSvgSelector';
import style from '../Navigation/Navigation.module.scss';

const Navigation= () => {
  const isLoggedIn = useSelector((state) => state.persistedReducer.auth.isLoggedIn);
  return (
      <div className={style.container}>
        <div className={style.containerLogo}>
          <LogoSvgSelector id='address-book' />
        </div>
        <nav >
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
            Мої контакти
          </NavLink>
          )}
        </nav> 
      </div>
      
    
    
  )
   
}
 
export default Navigation;