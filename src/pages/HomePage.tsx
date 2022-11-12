import { useAppDispatch } from '../redux/redux-hook';
import React, { useEffect, useState } from 'react';
import { RootState } from '../redux/reducer';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { closeNotification } from '../redux/messageSlice';
import Users from '../components/Users';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAuth } from '../redux/use-auth';
import s from '../components/home.module.css';


const HomePage = () => {

  const notification = useSelector((state: RootState) => state.messages.notification);
  const dispatch = useAppDispatch();

  const { isAuth } = useAuth();


  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeNotification(''))
  };


  return (isAuth ?
    <div className={s.wrap}>
      <div className={s.notificationWrap}>
        <Stack className={s.notification} spacing={2} sx={{ width: '100%' }}>
          <Snackbar className={s.notificationItem} open={notification} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
              New message arrived!
            </Alert>
          </Snackbar>
        </Stack>
        <Users />
      </div>
    </div>
    : <div className={s.backgroundWrapLogin}>
      <div>
        <NavLink className={s.loginButton} to={"/login"}>Login</NavLink>
      </div >

    </div>
  )
}


export default HomePage;