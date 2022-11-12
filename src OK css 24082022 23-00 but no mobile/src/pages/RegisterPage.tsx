import React from 'react'
import { NavLink } from 'react-router-dom';
import SignUp from '../components/SignUp';
import s from '../components/formSignUp.module.css'
import styleHome from '../components/home.module.css'
import illustrationWorking from '../assets/images/illustration-working.svg'

type Props = {}

const RegisterPage = (props: Props) => {
  return (
    <div className={s.registerPageWrap}>

      <SignUp />
      <div className={s.account}>Already have account? <NavLink className={s.buttonRegister} to={"/login"}>
        Sign in</NavLink></div>
      <div className={s.illustrationWorkingWrap}>
        <img className={s.illustrationWorking} src={illustrationWorking} alt='illustrationWorking' />
      </div>
    </div>
  )
}

export default RegisterPage;