import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import FormLogin from './FormLogin';
import { useNavigate } from 'react-router-dom';
import { setUserAuth } from '../redux/userSlice';
import FormSignUp from './FormSignUp';

const SignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string, firstName: string, lastName: string) => {

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;


        dispatch(setUserAuth(
          {
            email: user.email,// то что ожидаем в payload, пришло в console.log(auth)
            token: user.refreshToken,//пришло в console.log(auth)
            id: user.uid,
            firstName: firstName,
            lastName: lastName
          }
        ))
        navigate('/')

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  return (
    <div><FormSignUp  /* title='register' */ handleClickSignUp={handleRegister} /></div>
  )
}

export default SignUp;