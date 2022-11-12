import React, { useState } from 'react';
import { FC } from 'react';
import s from '../components/loginPage.module.css';

interface LoginProps {
  title: string,
  handleClick: (email: string, password: string) => void
}

const FormLogin: FC<LoginProps> = ({ title, handleClick }) => {

  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  return (
    <div className={s.formLogin}>
      <input className={s.emailFormLogin} type='email'
        value={email}
        placeholder='Enter email'
        onChange={(e) => setEmail(e.target.value)} />

      <input className={s.passFormLogin} type='password'
        value={password}
        placeholder='Enter password'
        onChange={(e) => setPass(e.target.value)} />

      <button className={[s.buttonFormLogin, s.buttonFormLoginSignIn].join(' ')} onClick={() => handleClick(email, password)}>
        {title}
      </button>
    </div>
  )
}

export default FormLogin