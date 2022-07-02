import React from 'react';
import { Link } from 'react-router-dom';
import style from '../HomePage/HomePage.module.css'

const HomePage = () => (
  <div className={style.container}>
    <h1 className={style.title}>
      Привіт!
    </h1>
    <p className={style.title}> Раді вітати на сторінці нашого сервісу!</p>
    <Link to={`/login`}><button className={style.buttonLogin}>Вхід</button></Link>
    <p className={style.text}>Ще не зареєстрований, тоді скорішу доєднуйся до нас!</p>
    <Link to={`/register`}><button className={style.button}>Зареєструватися</button></Link>
  </div>
);

export default HomePage;