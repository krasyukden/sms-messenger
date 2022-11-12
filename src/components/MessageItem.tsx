import React, { FC, useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import userImg from '../assets/images/user.jpg'
import s from './home.module.css';
import MessagesList from './MessagesList'

interface ItemProps {
  message: string,
  user_id: string,
  time: string,
  scrollToBottom: any,
  bottom: boolean

}

const MessageItem: FC<ItemProps> = ({ user_id, message, time, scrollToBottom, bottom }) => {


  const userCurrent = useSelector((state: RootState) => state.messages.userCurrent);


  const myMessageLastTime = user_id === '0'
  const friendMessageLastTime = bottom && user_id !== '0'
  useEffect(() => {
    if (myMessageLastTime || friendMessageLastTime) scrollToBottom()
  }, []);

  return (
    <div>
      <div >
        <div className={user_id === '0' ? s.myMessageWrap : s.friendMessageWrap}>
          {user_id !== '0' && <img className={s.avatarStyleListMessage} src={userImg} alt='userImg' />}
          <div className={user_id === '0' ? s.myMessage : s.friendMessage}>
            <div className={user_id === '0' ? s.myMessageText : s.friendMessageText}>{message}</div>
          </div>
          <div className={user_id === '0' ? s.myTime : s.friendTime}>{time}</div>
        </div>
      </div>
    </div>
  )
}

export default MessageItem