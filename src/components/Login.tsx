import React from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import FormLogin from './FormLogin';
import { setUserAuth } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        //const user = userCredential.user;
        dispatch(setUserAuth(
          {
            email: user.email,// то что ожидаем в payload, пришло в console.log(auth)
            token: user.refreshToken,//пришло в console.log(auth)
            id: user.uid
          }
        ))
        navigate('/')
      })
      .catch(() => alert('Invalid user'));
  }
  return (
    <div><FormLogin title='Sign in' handleClick={handleLogin} /></div>
  )
}

export default Login

