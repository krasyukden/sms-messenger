import React from 'react'
import { NavLink } from 'react-router-dom'
import Login from '../components/Login'
import s from '../components/loginPage.module.css';


const LoginPage = () => {
  return (
    <div className={s.loginPageWrap}>
      <Login />
      <NavLink className={[s.buttonFormLogin, s.buttonFormLoginRegister].join(' ')} to="/Register">Register</NavLink>
    </div>
  )
}

export default LoginPage