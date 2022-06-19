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
      Замітки
    </NavLink>
  </nav>
);

export default Navigation;