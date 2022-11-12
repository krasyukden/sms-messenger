import { useAppDispatch } from '../redux/redux-hook';
import React, { useState } from 'react';
import { RootState } from '../redux/reducer';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addMessage, closeNotification, getMessageRequest, sortByTime } from '../redux/messageSlice';
import AddMessageField from '../components/AddMessageField';
import Users from '../components/Users';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAuth } from '../redux/use-auth';
import s from '../components/home.module.css';



const HomePage = () => {

  const notification = useSelector((state: RootState) => state.messages.notification);
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const userCurrent = useSelector((state: RootState) => state.messages.userCurrent);

  const { isAuth } = useAuth();

  const userCurrentMessageId = userCurrent[0].user_id

  const today = new Date()

  const date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear().toString().slice(-2);
  const time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const dateTime = date + ' ' + time;

  const addMessageIn = () => {
    if (text.trim().length) {
      dispatch(sortByTime())
      dispatch(addMessage({
        text,
        dateTime,
        today,
      }))
      setText('')



      setTimeout(() => {
        dispatch(getMessageRequest({ userCurrentMessageId, dateTime, today }))
        dispatch(sortByTime())
      }, 10000)
    }
  }

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
        <AddMessageField text={text} handleInput={setText} handleSubmit={addMessageIn} />
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