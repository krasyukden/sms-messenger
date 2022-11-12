import React, { FC, useState } from 'react';
import userImg from '../assets/images/user.jpg'
import s from './home.module.css';
import Preloader from '../components/Preloader';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducer';

interface ItemProps {
  message: string,
  user_id: string,
  time: string

}

const MessageItem: FC<ItemProps> = ({ user_id, message, time }) => {

  const loading = useSelector((state: RootState) => state.messages.loading);

  return (
    <div >
      {loading ? <Preloader /> :
        <div className={user_id === '0' ? s.myMessageWrap : s.friendMessageWrap}>
          {user_id !== '0' && <img className={s.avatarStyle} src={userImg} alt='userImg' />}
          <div className={user_id === '0' ? s.myMessage : s.friendMessage}>
            <div className={user_id === '0' ? s.myMessageText : s.friendMessageText}>{message}</div>
          </div>
          <div className={user_id === '0' ? s.myTime : s.friendTime}>{time}</div>
        </div>}
    </div>
  )
}

export default MessageItem