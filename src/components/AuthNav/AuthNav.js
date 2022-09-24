import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../AuthNav/AuthNav.module.scss'

export default function AuthNav() {
  return (
    <div>
      <NavLink
        to="/register"
        className={({ isActive }) => {
            return isActive
              ? [style.link, style.activeLink].join(' ')
              : style.link;
          }}
      >
        Реєстрація
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => {
            return isActive
              ? [style.link, style.activeLink].join(' ')
              : style.link;
          }}
      >
        Логін
      </NavLink>
    </div>
  );
}